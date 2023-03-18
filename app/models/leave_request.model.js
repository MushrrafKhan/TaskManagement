const sql = require("./db.js");

const Leave_request = function(leave_request) {
    var date = new Date();
    this.request_reason = leave_request.request_reason;
    this.day_type = leave_request.day_type;

    this.emp_id = leave_request.emp_id;
    this.hr_remark = leave_request.hr_remark;
    this.start_date = leave_request.start_date;
    this.end_date = leave_request.end_date;
    this.leave_message = leave_request.leave_message;
    this.createdAt = leave_request.createdAt;
    this.updatedAt = leave_request.updatedAt;
    //  this.created = date;
    //  this.updated = leave_request.updated;
    this.hr_id = leave_request.hr_id;
    this.status = leave_request.status;
    this.leave_type_id = leave_request.leave_type_id;

};

Leave_request.create = (newleave_request, result) => {
    console.log(newleave_request);
    sql.query("INSERT INTO leave_request SET ?", newleave_request, (err, res) => {
        if (err) {
            console.log("error ", err);
            result(null, err);
            return;
        }

        console.log("created leave_request", { id: res.inserId, ...newleave_request });
        result(null, { id: res.insertId, ...newleave_request });
    });

};

Leave_request.getAll = result => {
    console.log('---------------')
    sql.query("SELECT leave_request.id,request_reason,day_type,emp_id,hr_remark,start_date,end_date,leave_message,leave_request.status,hr_id,leave_type_id,leave_request.createdAt,leave_request.updatedAt, user.user_name AS emp_name FROM leave_request JOIN user ON leave_request.emp_id = user.id", (err, res) => {
        console.log(result)
        if (err) {
            console.log("error ", err);
            result(null, err);
            return;
        }
        
        // console.log("leave_request", res);
        result(null, res);
    });
};

Leave_request.getById = (emp_id, result) => {
    sql.query(`SELECT user.user_name AS employeeName, leave_type.name AS leaveType, leave_request.leave_message, leave_request.request_reason, leave_request.day_type, leave_request.hr_remark, leave_request.status, leave_request.hr_id, leave_request.start_date, leave_request.end_date, leave_request.leave_message, leave_request.createdAt, leave_request.updatedAt FROM leave_request LEFT JOIN user ON leave_request.emp_id = user.id LEFT JOIN leave_type on leave_type.id = leave_request.leave_type_id WHERE user.role = 'manager' AND leave_request.emp_id =  ${emp_id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res) {
            console.log("found request: ", res);
            result(null, res[0]);
            return;
        }

        // not found city with the id
        result({ kind: "not_found" }, null);
    });
};

Leave_request.updateById = (id, leave_request, result) => {
    sql.query(
        "UPDATE leave_request SET hr_remark = ?, status = ? WHERE id = ?", [leave_request.hr_remark, leave_request.status, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found leave_request with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated leave_request: ", { id: id, ...leave_request });
            result(null, { id: id, ...leave_request });
        }
    );
};

Leave_request.hrReqReply = (id, leave_request, result) => {
    sql.query(
        "UPDATE leave_request SET status = ?, hr_remark = ? WHERE id = ?", [leave_request.status, leave_request.hr_remark, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found leave_request with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated leave_request: ", { id: id, ...leave_request });
            result(null, { id: id, ...leave_request });
        }
    );
};

Leave_request.remove = (id, result) => {
    sql.query("DELETE FROM leave_request WHERE Id = ?", id, (err, res) => {
        if (err) {
            console.log("error ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "not found" }, null);
            return;
        }
        console.log("deleted leave_request with Id", id);
        result(null, res);

    });
};

Leave_request.removeAll = result => {
    sql.query("DELETE FROM leave_request", (err, res) => {
        if (err) {
            console.log("error ", err);
            result(null, err);
            return;
        }
        console.log(`deleted ${res.affectedRows} leave_request`);
    });

};

Leave_request.getByEmpId = (emp_id, result) => {
    sql.query(`SELECT * FROM leave_request WHERE emp_id = ${emp_id} ORDER BY status ASC`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res) {
            console.log("found city: ", res);
            result(null, res);
            return;
        }

        // not found city with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Leave_request;