const sql = require("./db.js");
var jwt = require('jsonwebtoken');


// constructor
const User = function(user) {
  var date = new Date();
  var token = jwt.sign({username:"ado"}, 'supersecret',{expiresIn: 120});
  this.email = user.email;
  this.user_name = user.user_name;
  this.status = user.status;
  this.password = user.password;
  this.createdAt = date;
  this.updatedAt = date;
  this.role = user.role;
  this.token = token;


};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  // User.signup = (newUser, result) => {
  //   sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(err, null);
  //       return;
  //     }
  
  //     console.log("created user: ", { id: res.insertId, ...newUser });
  //     result(null, { id: res.insertId, ...newUser });
  //   });
  // };

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};


User.checkEmailValidation = (email, result) => {
  sql.query(`SELECT * FROM user WHERE email = ?`,[email], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByRole = (role, result) => {
  sql.query("SELECT id FROM user WHERE role = ? order by id DESC limit 1",  [role], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("user: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE user SET email = ?, user_name = ?, status = ?, password = ?, createdAt = ?,updatedAt = ?,role = ?  WHERE id = ?",
    [user.email, user.user_name, user.status, user.password, user.createdAt, user.updatedAt, user.role, id],
    (err, res) => {
      console.log(res);
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM user WHERE id = ?", id, (err, res) => {
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

    console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} user`);
    result(null, res);
  });
};

User.login = (email,password, result) => {
  sql.query("SELECT * FROM user WHERE email=? and password = ?",[email,password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};


// User.forgotPassword = (email,password, user, result) => {
//  // var token = 'sdsdfsdf';
//   sql.query("UPDATE user SET  email = ?  WHERE password = ?",[email,password],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       if (res.affectedRows == 0) {
//         // not found User with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//         console.log("updated user: ", { email: email, ...user });
//         result(null, { email: email, ...user });
//       }
// );
// };


User.updateBytoken = (token,email, user, result) => {
  sql.query("UPDATE user SET  token = ?  WHERE email = ?",[token,email],
    (err, res) => {
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

        // console.log("updated user: ", { data: res, ...user });
        result(null, { data: res, ...user });
      }
);
};



User.ChangePass = (token,password, user, result) => {
  sql.query("UPDATE user SET  password = ?  WHERE token = ?",[password,token],
    (err, res) => {
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

        // console.log("updated user: ", { data: res, ...user });
        result(null, { data: res, ...user });
      }
);
};





User.userImageUpdate = (id, image, result) => {
  sql.query(
    "UPDATE user SET image = ? WHERE id = ?",[image,id],(err, res) => {
      console.log(res);
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, { id: id });
    }
  );
};


module.exports = User;
