const sql = require("./db.js");

// country
const Country = function(country) {
  var date = new Date();
  this.title = country.title;
  this.status = country.status;
  this.created_at = date;
  this.updated_at = date;
};

Country.create = (newCountry, result) => {
  sql.query("INSERT INTO country SET ?", newCountry, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created country: ", { id: res.insertId, ...newCountry });
    result(null, { id: res.insertId, ...newCountry });
  });
};

Country.findById = (country, result) => {
  sql.query(`SELECT * FROM country WHERE id = ${country}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found country: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found country with the id
    result({ kind: "not_found" }, null);
  });
};

Country.getAll = result => {
  sql.query("SELECT * FROM country  order by title ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("country: ", res);
    result(null, res[0]);
  });
};

Country.updateById = (id, country, result) => {
  sql.query(
    "UPDATE country SET title = ?, status = ?, created_at = ?,updated_at =? WHERE id = ?",
    [country.title, country.status, country.created_at, country.updated_at, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found country with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated country: ", { id: id, ...country });
      result(null, { id: id, ...country });
    }
  );
};

Country.remove = (id, result) => {
  sql.query("DELETE FROM country WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found country with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted country with id: ", id);
    result(null, res);
  });
};

Country.removeAll = result => {
  sql.query("DELETE FROM country", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} country`);
    result(null, res);
  });
};

module.exports = Country;