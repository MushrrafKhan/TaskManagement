const sql = require("./db.js");

// Branches
const Branches = function(branches) {
  var date = new Date();
  this.name = branches.name;
  this.status = branches.status;
  this.address = branches.address;
  this.phone = branches.phone;
  this.created_at = date;
  this.updated_at = date;
};

Branches.create = (newBranches, result) => {
    sql.query("INSERT INTO branches SET ?", newBranches, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created branches: ", { id: res.insertId, ...newBranches });
      result(null, { id: res.insertId, ...newBranches });
    });
  };

Branches.findById = (branches, result) => {
    sql.query(`SELECT * FROM branches WHERE id = ${branches}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found branches: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found branches with the id
      result({ kind: "not_found" }, null);
    });
  };

Branches.getAll = result => {
    sql.query("SELECT * FROM branches order by id DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("branches: ", res);
      result(null, res);
    });
  };

Branches.updateById = (id, branches, result) => {
    sql.query(
      "UPDATE branches SET name = ?, status = ?, address = ?, created_at = ?,updated_at =? WHERE id = ?",
      [branches.name, branches.status, branches.address, branches.created_at, branches.updated_at, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found branches with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated branches: ", { id: id, ...branches });
        result(null, { id: id, ...branches });
      }
    );
  };

Branches.remove = (id, result) => {
    sql.query("DELETE FROM branches WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found branches with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted branches with id: ", id);
      result(null, res);
    });
  };

Branches.removeAll = result => {
    sql.query("DELETE FROM branches", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} branches`);
      result(null, res);
    });
  };

module.exports = Branches;
  