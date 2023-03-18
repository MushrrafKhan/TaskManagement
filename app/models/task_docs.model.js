const sql = require("./db.js");

const Task_docs = function(task_docs) {
    var date = new Date();
    this.task_id = task_docs.task_id;
    this.image = task_docs.image;
    this.docs = task_docs.docs;
    this.created_at = date;
    this.updated_at = date; 
};

Task_docs.create = (newTask_docs, result) => {
    sql.query("INSERT INTO task_docs SET ?", newTask_docs, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created task_docs: ", { id: res.insertId, ...newTask_docs });
      result(null, { id: res.insertId, ...newTask_docs });
    });
  };

Task_docs.findById = (task_docs, result) => {
  sql.query(`SELECT * FROM task_docs WHERE id = ${task_docs}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found task_docs: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found task_docs with the id
    result({ kind: "not_found" }, null);
  });
};

Task_docs.getAll = result => {
  sql.query("SELECT * FROM task_docs order by id DESC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("task_docs: ", res);
    result(null, res);
  });
};

Task_docs.updateById = (id, task_docs, result) => {
  sql.query(
    "UPDATE task_docs SET task_id = ?, image = ?, docs = ?  WHERE id = ?",
    [task_docs.task_id, task_docs.image, task_docs.docs,  id],
    (err, res) => {
      console.log(res);
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found task_docs with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated task_docs: ", { id: id, ...task_docs });
      result(null, { id: id, ...task_docs });
    }
  );
};

Task_docs.remove = (id, result) => {
  sql.query("DELETE FROM task_docs WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found task_docs with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted task_docs with id: ", id);
    result(null, res);
  });
};

Task_docs.removeAll = result => {
  sql.query("DELETE FROM task_docs", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} task_docs`);
    result(null, res);
  });
};


Task_docs.taskImageUpdate = (id, image, result) => {
    sql.query(
      "UPDATE task_docs SET image = ? WHERE id = ?",[image,id],(err, res) => {
        console.log(res);
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found task_docs with the id
          result({ kind: "not_found" }, null);
          return;
        }
  
        result(null, { id: id });
      }
    );
  };

module.exports = Task_docs;
