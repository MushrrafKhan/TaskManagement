const sql = require("./db.js");

// constructor
const Further_assign = function(further_assign) {
  var datetime = new Date();
  this.task_id = further_assign.task_id;
  this.user_id = further_assign.user_id;
  this.created_at = datetime;
  this.updated_at = further_assign.updated_at;
};

Further_assign.create = (newFurther_assign, result) => {
    sql.query("INSERT INTO further_assign SET ?", newFurther_assign, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created further_assign: ", { id: res.insertId, ...newFurther_assign });
      result(null, { id: res.insertId, ...newFurther_assign });
    });
  };

Further_assign.findById = (further_assignId, result) => {
    sql.query(`SELECT * FROM further_assign WHERE id = ${further_assignId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found further_assign: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found further_assign with the id
      result({ kind: "not_found" }, null);
    });
  };

Further_assign.getAll = result => {
    sql.query("SELECT * FROM further_assign", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("further_assign: ", res);
      result(null, res);
    });
  };

Further_assign.updateById = (id, further_assign, result) => {
    sql.query(
      "UPDATE further_assign SET task_id = ?, user_id = ? , created_at = ?, updated_at = ?  WHERE id = ?",
      [further_assign.task_id, further_assign.user_id, further_assign.created_at, further_assign.updated_at, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found further_assign with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated further_assign: ", { id: id, ...further_assign });
        result(null, { id: id, ...further_assign });
      }
    );
  };

Further_assign.remove = (id, result) => {
    sql.query("DELETE FROM further_assign WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Further_assign with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted further_assign with id: ", id);
      result(null, res);
    });
  };

Further_assign.removeAll = result => {
    sql.query("DELETE FROM further_assign", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} further_assign`);
      result(null, res);
    });
  };

  module.exports = Further_assign;
