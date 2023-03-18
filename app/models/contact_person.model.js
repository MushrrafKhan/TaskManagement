const sql = require("./db.js");

// constructor
const Contact_person = function(contact_person) {
  var datetime = new Date();
  this.name = contact_person.name;
  this.email = contact_person.email;
  this.phone = contact_person.phone;
  this.created_by	= datetime;
  this.created_at	 = datetime;
  this.updated_at = contact_person.updated_at;
};

Contact_person.create = (newContact_person, result) => {
    sql.query("INSERT INTO contact_person SET ?", newContact_person, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created contact_person: ", { id: res.insertId, ...newContact_person });
      result(null, { id: res.insertId, ...newContact_person });
    });
  };

Contact_person.findById = (contact_personId, result) => {
    sql.query(`SELECT * FROM contact_person WHERE id = ${contact_personId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found contact_person: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found contact_person with the id
      result({ kind: "not_found" }, null);
    });
  };

Contact_person.getAll = result => {
    sql.query("SELECT * FROM contact_person order by id DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("contact_person: ", res);
      result(null, res);
    });
  };

Contact_person.updateById = (id, contact_person, result) => {
    sql.query("UPDATE contact_person SET name = ?, email = ?, phone = ?, created_by = ? WHERE id = ?",
      [contact_person.name, contact_person.email, contact_person.phone, contact_person.created_by, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found contact_person with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated contact_person: ", { id: id, ...contact_person });
        result(null, { id: id, ...contact_person });
      }
    );
  };

Contact_person.remove = (id, result) => {
    sql.query("DELETE FROM contact_person WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found contact_person with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted contact_person with id: ", id);
      result(null, res);
    });
  };

Contact_person.removeAll = result => {
    sql.query("DELETE FROM contact_person", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} contact_person`);
      result(null, res);
    });
  };

module.exports = Contact_person;
