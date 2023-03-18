const sql = require("./db.js");

// constructor
const Project = function(project) {
  var datetime = new Date();
  this.title = project.title;
  this.status = project.status;
  this.end_date = project.end_date;
  this.project_head = project.project_head;
  this.contact_person_id = project.contact_person_id;
  this.close_date = project.close_date;
  this.start_date = project.start_date;
  this.due_date = project.due_date;
  this.description = project.description;
  this.created_at = datetime;
  this.update_date = datetime;
  this.created_by = project.created_by;
};  

Project.create = (newProject, result) => {
    sql.query("INSERT INTO project SET ?", newProject, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created project: ", { id: res.insertId, ...newProject });
      result(null, { id: res.insertId, ...newProject });
    });
  };

Project.findById = (projectId, result) => {
    sql.query(`SELECT * FROM project WHERE id = ${projectId}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found project: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found project with the id
      result({ kind: "not_found" }, null);
    });
  };

Project.getAll = result => {
    sql.query("SELECT * FROM project order by id DESC", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("project: ", res);
      result(null, res);
    });
  };

Project.updateById = (id, project, result) => {
    sql.query(
      "UPDATE project SET title = ?, status = ?, end_date = ?, project_head = ?, contact_person_id = ?, close_date = ?, start_date = ?, due_date = ?, description = ?, created_at = ?, update_date = ?, created_by = ?  WHERE id = ?",
      [project.title, project.status, project.end_date, project.project_head, project.contact_person_id, project.close_date,project.start_date, project.due_date, project.description, project.created_at, project.update_date,project.created_by,id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found project with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated project: ", { id: id, ...project });
        result(null, { id: id, ...project });
      }
    );
  };

Project.remove = (id, result) => {
    sql.query("DELETE FROM project WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found project with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted project with id: ", id);
      result(null, res);
    });
  };

Project.removeAll = result => {
    sql.query("DELETE FROM project", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} project`);
      result(null, res);
    });
  };

Project.getProjectLimited = result => {
   sql.query("SELECT * FROM project order by id DESC LIMIT 5 ", (err, res) => {
    if (err) {
       console.log("error: ", err);
       result(null, err);
       return;
     }

    console.log("project: ", res);
    result(null, res);
  });
 };

module.exports = Project;
