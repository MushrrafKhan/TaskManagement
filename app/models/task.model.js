const sql = require("./db.js");

// constructor
const Task = function(task) {
    var datetime = new Date();
    this.project_id = task.project_id;
    this.title = task.title;
    this.description = task.description;
    this.doc = task.doc;
    this.assign_to = task.assign_to;
    this.start_date = datetime;
    this.due_date = task.due_date;
    this.close_date = task.close_date;
    this.status = task.status;
    this.created_by = task.created_by;
    this.user_id = task.user_id;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    // this.created_at = datetime;
    // this.updated_at = datetime;
};

Task.create = (newTask, result) => {
    sql.query("INSERT INTO task SET ?", newTask, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created task: ", { id: res.insertId, ...newTask });
        result(null, { id: res.insertId, ...newTask });
    });
};

Task.findById = (taskId, result) => {
    sql.query(`SELECT * FROM task WHERE id = ${taskId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found task: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found task with the id
        result({ kind: "not_found" }, null);
    });
};

Task.getAll = result => {
    sql.query("SELECT project.title AS pTitle, task.user_id,task.title AS tTitle, task.description,task.doc,task.assign_to,task.status ,task.start_date,task.due_date ,task.close_date,task.created_by,task.created_at,task.updated_at FROM task LEFT JOIN project on project.id = task.project_id order by task.id DESC", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("task: ", res);
        result(null, res);
    });
};

Task.updateById = (id, task, result) => {
    sql.query(
        "UPDATE task SET project_id = ?, title = ?, description = ?, doc = ?, start_date = ?, due_date = ?, close_date = ?, status = ?, created_by = ?, created_at = ?, updated_at = ?  WHERE id = ?", [task.project_id, task.title, task.description, task.doc, task.start_date, task.due_date, task.close_date, task.status, task.created_by, task.created_at, task.updated_at, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found task with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated task: ", { id: id, ...task });
            result(null, { id: id, ...task });
        }
    );
};

Task.remove = (id, result) => {
    sql.query("DELETE FROM task WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted task with id: ", id);
        result(null, res);
    });
};

Task.removeAll = result => {
    sql.query("DELETE FROM task", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} task`);
        result(null, res);
    });
};
Task.findByTaskId = (task_id, result) => {
    sql.query(`SELECT * FROM task WHERE id = ${task_id} limit 1`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {

            console.log("found data: ", res[0]);
            result(null, res);
            return;
        }

        // not found data with the id
        result({ kind: "not_found" }, null);
    });
};

Task.findByTaskIdComment = (task_id, result) => {
    sql.query(`SELECT comment.*,user.user_name,user.id as userId FROM comment left join user on user.id = comment.user_id WHERE task_id = ${task_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {

            console.log("found data: ", res[0]);
            result(null, res);
            return;
        }

        // not found data with the id
        result({ kind: "not_found" }, null);
    });
};

Task.findByProjectId = (project_id, result) => {
    sql.query(`SELECT * FROM task WHERE project_id= ${project_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found task: ", res[0]);
            result(null, res);
            return;
        }

        // not found task with the project_id
        result({ kind: "not_found" }, null);
    });
};

Task.findByUserId = (user_id, result) => {
    sql.query(`SELECT task.title FROM task WHERE user_id= ${user_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found task: ", res);
            result(null, res);
            return;
        }

        // not found task with the user_id
        result({ kind: "not_found" }, null);
    });
};

Task.findByDesc = result => {
    sql.query("SELECT * FROM `task` ORDER BY `id` DESC LIMIT 5", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("task: ", res);
        result(null, res);
    });
};

Task.getAllStatus = (status, pId, userId, result) => {
    sql.query("SELECT * FROM `task` WHERE status = ? and project_id = ? and user_id = ? order by id DESC", [status, pId, userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("task: ", res);
        result(null, res);
    });
};

Task.getAllAdminStatus = (status, pId, result) => {
    sql.query("SELECT task.*,user.user_name,user.image,user.email FROM `task` left join user on task.user_id=user.id WHERE task.status = ? and task.project_id = ? order by id DESC", [status, pId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("task: ", res);
        result(null, res);
    });
};


Task.findByStatus = (userId, result) => {
    sql.query(`SELECT count(id) as statusCount,status FROM task WHERE user_id = ? GROUP BY status`, userId, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found task: ", res[0]);
            result(null, res);
            return;
        }

        // not found task with the status
        result({ kind: "not_found" }, null);
    });
};


Task.updateByUserId = (user_id, task, result) => {
    sql.query(
        "UPDATE task SET status = ?  WHERE user_id = ?", [task.status, user_id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found task with the user_id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated task: ", { user_id: user_id, ...task });
            result(null, { user_id: user_id, ...task });
        }
    );
};

Task.updateStatusById = (id, task, result) => {
    sql.query(
        "UPDATE task SET status = ?  WHERE id = ?", [task.status, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found task with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated task: ", { id: id, ...task });
            result(null, { id: id, ...task });
        }
    );
};


module.exports = Task;