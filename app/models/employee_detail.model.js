const sql = require("./db.js");

// Employee_detail
const Employees_detail = function(employee_detail) {
  var date = new Date();
  this.user_id	 = employee_detail.user_id;
  this.department_id = employee_detail.department_id;
  this.official_email = employee_detail.official_email;
  this.emp_photo = employee_detail.emp_photo;
  this.	dob = employee_detail.dob;
  this.	gender	 = employee_detail.gender;
  this.	blood_group = employee_detail.blood_group;
  this.	personal_email = employee_detail.personal_email;
  this.	aadhar_number = employee_detail.aadhar_number;
  this.	pan_number = employee_detail.pan_number;
  this.	contact_number_1	 = employee_detail.contact_number_1	;
  this.	marital_status = employee_detail.martial_status;
  this.	date_of_anniversary = employee_detail.date_of_anniversary;
  this.	date_of_joining = employee_detail.date_of_joining;
  this.	manager_id = employee_detail.manager_id;
  this.	designation_id = employee_detail.designation_id;
  this.	status = employee_detail.status;
  this.	created_at = date;
  this.	updated_at = date;

};

Employees_detail.create = (newEmployee_detail, result) => {
  sql.query("INSERT INTO employee_detail SET ?", newEmployee_detail, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created employee_detail: ", { id: res.insertId, ...newEmployee_detail });
    result(null, { id: res.insertId, ...newEmployee_detail });
  });
};

Employees_detail.findById = (employee_detailId, result) => {
  sql.query(`SELECT * FROM employee_detail WHERE id = ${employee_detailId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee_detail: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee_detail with the id
    result({ kind: "not_found" }, null);
  });
};

Employees_detail.getAll = result => {
  sql.query("SELECT * FROM employee_detail", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("employee_detail: ", res);
    result(null, res);
  });
};

Employees_detail.updateById = (id, employee_detail, result) => {
  sql.query(
    "UPDATE employee_detail SET user_id = ?, department_id = ?, official_email = ?, emp_photo = ?,dob =?, gender = ?, blood_group = ?, personal_email = ?, aadhar_number = ?, pan_number = ?, contact_number_1 = ?, marital_status = ?, date_of_anniversary = ?, date_of_joining = ?, manager_id = ?, designation_id = ?, status = ?, created_at = ?,updated_at = ? WHERE id = ?",
    [employee_detail.user_id, employee_detail.department_id, employee_detail.official_email,employee_detail.emp_photo,employee_detail.dob,employee_detail.gender,employee_detail.blood_group,employee_detail.personal_email,employee_detail.aadhar_number,employee_detail.pan_number,employee_detail.contact_number_1,employee_detail.marital_status,employee_detail.date_of_anniversary,employee_detail.date_of_joining,employee_detail.manager_id,employee_detail.designation_id, employee_detail.status, employee_detail.created_at, employee_detail.updated_at, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found employee_detail with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated employee_detail: ", { id: id, ...employee_detail });
      result(null, { id: id, ...employee_detail });
    }
  );
};

Employees_detail.remove = (id, result) => {
  sql.query("DELETE FROM employee_detail WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found employee_detail with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted employee_detail with id: ", id);
    result(null, res);
  });
};

Employees_detail.removeAll = result => {
  sql.query("DELETE FROM employee_detail", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} employee_detail`);
    result(null, res);
  });
};


Employees_detail.findByUserId = (user_id, result) => {
  sql.query(`SELECT * FROM employee_detail WHERE user_id = ${user_id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found employee_detail: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Employee_detail with the user_id
    result({ kind: "not_found" }, null);
  });
};

module.exports = Employees_detail;