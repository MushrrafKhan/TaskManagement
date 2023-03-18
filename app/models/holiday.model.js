const sql = require("./db.js");

// holiday
const Holiday = function(holiday) {
  var date = new Date();
  this.name = holiday.name;
  this.holiday_date = holiday.holiday_date;
  this.department_id = holiday.department_id;
  this.status = holiday.status;
 
};

Holiday.create = (newHoliday, result) => {
  sql.query("INSERT INTO holiday SET ?", newHoliday, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created holiday: ", { id: res.insertId, ...newHoliday });
    result(null, { id: res.insertId, ...newHoliday });
  });
};

Holiday.findById = (holiday, result) => {
  sql.query(`SELECT holiday.name ,holiday.status,holiday.holiday_date,department.name AS departmentName FROM holiday LEFT JOIN department ON holiday.department_id = department.id WHERE holiday.id = ${holiday}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      console.log("found holiday: ", res);
      result(null, res);
      return;
    }

    // not found holiday with the id
    result({ kind: "not_found" }, null);
  });
};

Holiday.getByDate = (date, result) => {
  console.log(`SELECT * FROM holiday WHERE holiday_date = '${date}'`);
  sql.query(`SELECT * FROM holiday WHERE holiday_date = '${date}'`, (err, res) => {
    console.log("DATALOG",res);
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      console.log("found holiday: ", res);
      result(null, res[0]);
      return;
    }

    // not found holiday with the id
    result({ kind: "not_found" }, null);
  });
};

Holiday.getAll = result => {
  sql.query("SELECT name as title ,DATE_FORMAT(holiday_date,'%Y-%m-%d') as date   FROM holiday", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("holiday: ", res);
    result(null, res);
  });
};

Holiday.updateById = (id, holiday, result) => {
  sql.query(
    "UPDATE holiday SET name = ?, holiday_date = ?, department_id = ?, status = ? WHERE id = ?",
    [holiday.name, holiday.holiday_date, holiday.department_id, holiday.status, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found holiday with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated holiday: ", { id: id, ...holiday });
      result(null, { id: id, ...holiday });
    }
  );
};

Holiday.remove = (id, result) => {
  sql.query("DELETE FROM holiday WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found holiday with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted holiday with id: ", id);
    result(null, res);
  });
};

Holiday.removeAll = result => {
  sql.query("DELETE FROM holiday", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} holiday`);
    result(null, res);
  });
};

module.exports = Holiday;