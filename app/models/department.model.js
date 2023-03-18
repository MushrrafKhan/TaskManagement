const sql = require("./db.js");

//constructor
const Department = function (department){
   var datetime = new Date();
   var date= Date.now();
    this.status = department.status;
    this.name = department.name;
    this.created_at = datetime;
    this.updated_at = datetime;
    this.branches_id = department.branches_id;
}

Department.create = (newDepartment, result) => {
    sql.query("INSERT INTO department SET ?", newDepartment, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created department: ", { id: res.insertId, ...newDepartment });
      result(null, { id: res.insertId, ...newDepartment });
    });
  };

Department.findById = (departmentId, result) => {
    sql.query(`SELECT * FROM department WHERE id = ${departmentId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found department: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found department with the id
      result({ kind: "not_found" }, null);
    });
  };

Department.getAll = result => {
    sql.query("SELECT * FROM department order by id DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("department: ", res);
      result(null, res);
    });
  };

Department.updateById = (id, department, result) => {
    sql.query(
      "UPDATE department SET status = ?, name = ?, branches_id=?  WHERE id = ?",
      [department.status, department.name,department.branches_id, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found department with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated department: ", { id: id, ...department });
        result(null, { id: id, ...department });
      }
    );
  };

Department.remove = (id, result) => {
    sql.query("DELETE FROM department WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found department with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted department with id: ", id);
      result(null, res);
    });
  };

Department.removeAll = result => {
    sql.query("DELETE FROM department", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} department`);
      result(null, res);
    });
  };

Department.findByBranches = (branches_id, result) => {
    sql.query(`SELECT * FROM department WHERE branches_id = ${branches_id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found branches: ", res[0]);
        result(null, res);
        return;
      }
  
      // not found comment with the id
      result({ kind: "not_found" }, null);
    });
  };

  module.exports = Department;