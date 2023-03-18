const sql = require("./db.js");

// city
const City = function(city) {
  var date = new Date();
  this.state_id = city.state_id;
  this.title = city.title;
  this.status = city.status;
  this.created_at = date;
  this.updated_at = date;
};

City.create = (newCity, result) => {
  sql.query("INSERT INTO city SET ?", newCity, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created city: ", { id: res.insertId, ...newCity });
    result(null, { id: res.insertId, ...newCity });
  });
};

City.findById = (city, result) => {
  sql.query(`SELECT state.title AS stateName, city.title AS cityName, city.status, city.created_at, city.updated_at FROM city LEFT JOIN state ON city.state_id = state.id WHERE city.id = ${city}`, (err, res) => {
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

City.getAll = result => {
  sql.query("SELECT * FROM city order by title ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("city: ", res);
    result(null, res);
  });
};

City.updateById = (id, city, result) => {
  sql.query(
    "UPDATE city SET state_id = ?, title = ?, status = ?, created_at = ?,updated_at =? WHERE id = ?",
    [city.state_id, city.title, city.status, city.created_at, city.updated_at, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found city with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated city: ", { id: id, ...city });
      result(null, { id: id, ...city });
    }
  );
};

City.remove = (id, result) => {
  sql.query("DELETE FROM city WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found city with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted city with id: ", id);
    result(null, res);
  });
};

City.removeAll = result => {
  sql.query("DELETE FROM city", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} city`);
    result(null, res);
  });
};

module.exports = City;