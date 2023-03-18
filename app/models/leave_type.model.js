const sql = require("./db.js");

// leave_type
const Leave_type = function(leave_type) {
  this.name = leave_type.name;
  this.representation = leave_type.representation;
  this.color_code = leave_type.color_code;
  this.paid = leave_type.paid;
  this.company_id = leave_type.company_id;
}

Leave_type.create = (newLeave_type, result) => {
  sql.query("INSERT INTO leave_type SET ?", newLeave_type, (err, res) => {
  if (err) {
    console.log("error: ", err);
    result(err, null);
    return;
  }
  
  console.log("created leave_type", { id: res.insertId, ...newLeave_type});
  result(null, { id: res.insertId, ...newLeave_type});

  });

};

Leave_type.getAll = result => {
  sql.query("SELECT * FROM leave_type", (err, res) => {
    if (err) {
      console.log("error: " , err);
      result(null, err);
      return;
    }
    console.log("leave_type: ", res);
    result(null, res);
  });
};

Leave_type.getById = (leave_type, result) => {
  sql.query(`SELECT * FROM leave_type WHERE Id = ${leave_type}`, (err,res) => {
     if(err){
        console.log("error ", err);
        result(null, err);
        return;
     }
     

   if (res.length) {
     console.log("found state: ", res[0]);
     result(null, res[0]);
     return;
   }

     result(null, {kind: "not found"});
  });
};

Leave_type.updateById = (id, leave_type,result) => {
  sql.query("UPDATE leave_type SET name = ?, representation = ?, color_code = ?, paid = ?, company_id = ? WHERE id = ?",
  
  [leave_type.name, leave_type.representation, leave_type.color_code, leave_type.paid, leave_type.company_id, id],
  (err,res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found"}, null);
      return;
}

    console.log("updated leave_type:", {id: id, ...leave_type});
    result(null, { id: id, ...leave_type});
  }
  );
};

Leave_type.remove = (id, result) => {
  sql.query("DELETE FROM leave_type WHERE id = ?", id,(err,res) => {
    if(err) {
      console.log("error ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({kind: "not_found"}, null);
      return;
    }
    
    console.log("deleted leave_type with id:", id);
    result(null, res);
  });
};


Leave_type.removeAll = result => {
  sql.query("DELETE FROM leave_type", (err, res) => {
    if (err) {
      console.log("error ", err);
      result(null, err);
      return;
    }
 
    console.log(`deleted ${res.affectedRows} leave_type`);
  });
};

module.exports = Leave_type;

