const sql = require("./db.js");

// state
const State = function(state) {
  var date = new Date();
  this.country_id	 = state.country_id	;
  this.title = state.title;
  this.status = state.status;
  this.created_at = date;
  this.updated_at = date;
};

State.create = (newState, result) => {
  sql.query("INSERT INTO state SET ?", newState, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created state: ", { id: res.insertId, ...newState });
    result(null, { id: res.insertId, ...newState });
  });
};

State.findById = (state, result) => {
  sql.query(`SELECT country.title AS countryName, state.title AS stateName, state.status, state.created_at, state.updated_at FROM state LEFT JOIN country ON state.country_id = country.id WHERE state.id = ${state}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found state: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found state with the id
    result({ kind: "not_found" }, null);
  });
};

State.getAll = result => {
  sql.query("SELECT * FROM state order by title ASC", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("state: ", res);
    result(null, res);
  });
};

State.updateById = (id, state, result) => {
  sql.query(
    "UPDATE state SET country_id = ?, title = ?, status = ?, created_at = ?,updated_at =? WHERE id = ?",
    [state.country_id, state.title, state.status, state.created_at, state.updated_at, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found state with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated state: ", { id: id, ...state });
      result(null, { id: id, ...state });
    }
  );
};

State.remove = (id, result) => {
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

State.removeAll = result => {
  sql.query("DELETE FROM state", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} state`);
    result(null, res);
  });
};

module.exports = State;