const User = require("../models/user.model.js");
const db = require("../models");

var jwt = require("jsonwebtoken");
const config = require("../config/app.config.js");
const { Validator } = require('node-input-validator');
const validator = require('validator');
const multer = require("multer");
const path = require("path");
const sgMail = require("@sendgrid/mail");
const { response } = require("express");
var dateFormat = require("dateformat");
var bcrypt = require("bcryptjs");

// var validator = require("validator");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
//var token = jwt.sign({username:"ado"}, 'supersecret',{expiresIn: 120});
exports.uploadImage = (req, res) => {
  let upload = multer({ storage: storage }).single("image");

  upload(req, res, function (err) {
    console.log(req.params.userId);

    User.userImageUpdate(req.params.userId, req.file.filename, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found user with id ${req.params.userId}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating user with id " + req.params.userId,
          });
        }
      } else {
        console.log(req.file.filename);
        res.send({ response: req.file, test: "test" });
      }
    });
  });
};

// Create and Save a new
exports.create = (req, res) => {};

// Retrieve all users from the database.
exports.findAll = (req, res) => {};

// Find a single  with a Id
exports.findOne = (req, res) => {};

// Update a  identified by the Id in the request
exports.update = (req, res) => {};

// Delete a  with the specified Id in the request
exports.delete = (req, res) => {};

// Delete all s from the database.
exports.deleteAll = (req, res) => {};

// exports.resetPassword = (req, res) => {};

exports.tokenreset = (req, res) => {};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a user
  const user = new User({
    user_name: req.body.user_name,
    email: req.body.email,
    status: req.body.status,
    password: req.body.password,
    //  created_at: req.body.created_at,
    //   updated_at: req.body.updated_at,
    role: req.body.role,
    token: req.body.token,
  });

  // Save user in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the .",
      });
    else res.send(data);
  });
};

exports.signup = (req, res) => {

  User.checkEmailValidation(req.body.email, (err, data) => {
    if(!validator.isEmail(req.body.email)) {
      res.send({
        status:false,
        msg:'Invalid email address',
        data:{}
      });
      return;
    }
    if (err) {
      if (err.kind === "not_found") {
        var date = dateFormat(new Date(), "yyyy-mm-dd h:MM:s");
        const users = new User({
          user_name: req.body.user_name,
          email: req.body.email,
          status: 'active',
          password: bcrypt.hashSync(req.body.password,8) ,
          createdAt: date,
          updatedAt: date,
          role: 'emp',
          token: req.body.token,
        });      
        User.create(users, (err, data) => {
          if (err){
          var response = {
            status:false,
            msg:"Something wrong with request."+ err,
            data:{}
          }
          res.send(response);
          return;
        }
          else {
            var response = {
              status:true,
              msg:"User created successfully.",
              data:data
            }
            res.send(response);
            return;
          }
        });
      } else {
        var response = {
          status:false,
          msg:"Something wrong with request."+ err,
          data:{}
        }
        res.send(response);
        return;
        
      }
    } else {
      var response = {
        status:false,
        msg:"Email already taken.",
        data:{}
      }
      res.send(response);
      return;
      
    }
  });
  
};

exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving s.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating user with id " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete user with id " + req.params.userId,
        });
      }
    } else res.send({ message: `user was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all user.",
      });
    else res.send({ message: `All user were deleted successfully!` });
  });
};

exports.login = (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  User.login(email, password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        var response = {
          status: false,
          msg: "Invalid email and password",
          data: {},
        };
        res.send(response);
        return;
      } else {
        var response = {
          status: false,
          msg: "Error retrieving User with id " + email,
          data: {},
        };
        res.send(response);
        return;
      }
    } else {
      var response = {
        status: true,
        msg: "Data fatch successfully",
        data: data,
      };
      res.send(response);
    }
  });
};

/* exports.login = (req, res) => {
    
  db.users.findOne({
    where: {
        email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        res.send({
            status:false,
            msg: 'User Not found.',
          });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
         res.status(401).send({
          accessToken: null,
          status: false,
          msg: "Invalid Password!"
        });
      }
console.log("AAAAAAAAAA",user);
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
        res.send({
          msg: 'Login Successfully',
          status:true,
          data:{
            id: user.id,
            username: user.username,
            email: user.email,
            phone_no: user.phone_no,
            role: user.role,
            accessToken: token,
          }
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
}; */

//reset password by Mushrraf Khan
exports.resetPassword = (req, res) => {
  //res.send("data");
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId,
        });
      }
    } else {
      if (data.password == req.body.oldpassword) {
        console.log(`data.password -------${data.password}`);
        data.password = req.body.newpassword;
        User.updateById(
          req.params.userId,
          new User(data),
          (err, dataUpdate) => {
            res.status(202).send({
              message: "Password reset successfully.",
            });
          }
        );
      } else {
        res.status(400).send({
          message: "Old Password is Invalid.",
        });
      }
    }
  });
};

/* exports.resetpass = (req,res) => {
  console.log(req.params.userid);
  return db.users.findOne({
    where: {
      id:req.params.userid,
    }
  }).then((data) => {
    console.log("ddddddddd");
    var passwordIsValid = bcrypt.compareSync(req.body.oldpass,data.password);
    if(passwordIsValid){
      req.body.password =  bcrypt.hashSync(req.body.password, 8);
db.users.update(req.body, {
  where: { id: req.params.userid }
})
.then((post) => {

  if (post == 1) {
    var response = {
      status : true,
      msg : "Password updated successfully.",
      data : post,
    }
    res.send(response);
  }else {
    var response = {
      status : false,
      msg : 'Record not found  with id '+req.params.id,
      data : [],
    }
    res.send(response);    }
})
  .catch(err => {
    res.status(500).send({
      message: "Error updating User with id=" + id
    });
  });
    }else{
      var response = {
        status : false,
        msg : 'password mismatch or user not found',
        data : [],
      }
      res.send(response);
    }
  }).catch((err) => {
    var response = {
      status : false,
      msg : 'Something wrong with request: ' + err,
      data : err,
    }
    res.send(response);
  });

} */

// exports.resetPassword = (req, res) => {
//   console.log(req.params.userid);
//   return db.users.findOne({
//     where: {
//       id: req.params.userid,
//     },
//   })
//     .then((data) => {
//       var passwordIsValid = req.body.otp;
//       if (passwordIsValid) {
//         req.body.password = bcrypt.hashSync(req.body.password, 8);
//         db.users.update(req.body, {
//           where: { id: req.params.userid },
//         })
//           .then((post) => {
//             if (post == 1) {
//               var response = {
//                 status: true,
//                 msg: "Password updated successfully.",
//                 data: post,
//               };
//               res.send(response);
//             } else {
//               var response = {
//                 status: false,
//                 msg: "Record not found  with id " ,
//                 data: [],
//               };
//               res.send(response);
//             }
//           })
//           .catch((err) => {
//             res.status(500).send({
//               message: "Error updating User with id=" ,
//             });
//           });
//       } else {
//         var response = {
//           status: false,
//           msg: "password mismatch or user not found",
//           data: [],
//         };
//         res.send(response);
//       }
//     })
//     .catch((err) => {
//       var response = {
//         status: false,
//         msg: "Something wrong with request: " + err,
//         data: err,
//       };
//       res.send(response);
//     });
// };

exports.forgotPassword = (req, res) => {
  const email = req.body.email;
  var otp = Math.floor(1000 + Math.random() * 9000);

  req.body.otp = otp;
  console.log(req.body);

  db.users
    .update(req.body, {
      where: { email: email },
    })
    .then(async (num) => {
      const userData = await db.users.findOne({
        attributes: ["id"],
        email: email,
      });
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(
        "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"
      );
      const msg = {
        to: email, // Change to your recipient
        from: "firoj.deshwaly@gmail.com", // Change to your verified sender
        subject: "Forgot Password Otp",
        text: "Exploreo Gorgot password otp is ",
        html: "<h4>" + otp + "</h4>",
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });

      if (num == 1) {
        res.send({
          status: true,
          message: "otp genrated  successfully.",
          data: userData,
        });
      } else {
        res.send({
          status: false,
          message: `Cannot update user with email=${email}. Maybe user was not found or request is empty!`,
          data: num,
        });
      }
    })
    .catch((err) => {
      res.send({
        status: false,
        message: "Something wrong with request." + err,
        data: {},
      });
    });
};

exports.checkPassword = (req, res) => {
  db.users
    .findOne({
      where: {
        otp: req.body.otp,
        email: req.body.email,
      },
    })
    .then((data) => {
      // var passwordIsValid = bcrypt.compareSync(req.body.oldpass, data.password);
        // req.body.password = bcrypt.hashSync(req.body.password, 8);
        db.users.update(req.body, {
          where: {
            otp: req.body.otp,
            email: req.body.email, },
        })
          .then((post) => {
            if (post == 1) {
              var response = {
                status: true,
                msg: "Password updated successfully.",
                data: post,
              };
              res.send(response);
            } else {
              var response = {
                status: false,
                msg: "Record not found  with otp and email " + req.body.email,
                data: [],
              };
              res.send(response);
            }
          })
          .catch((err) => {
            res.status(500).send({
              message: "Error updating User with Email " + req.body.email +" and Otp "+ req.body.otp,
            });
          });
    })
    .catch((err) => {
      res.send({
        status: false,
        msg: "Something wrong with request." + err,
        data: {},
      });
    });
};

// exports.forgot = (req, res) => {
//   var token = jwt.sign({ username: "ado" }, "supersecret", { expiresIn: 120 });

//   User.updateBytoken(token, req.body.email, new User(req.body), (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found User with Email ${req.body.email}.`,
//         });
//       }
//     } else {
//       console.log(data);
//       sgMail.setApiKey(
//         "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"
//       );

//       const msg = {
//         to: data.email, // Change to your recipient
//         from: "firoj.deshwaly@gmail.com", // Change to your verified sender
//         subject: "Forgot password form task_management",
//         text: "token",
//         html: token,
//         // html: res.sendFile('/home/mushraf/Documents/node_projects/property_care_api/app/mail/index.html'),
//       };

//       sgMail
//         .send(msg)
//         .then(() => {
//           console.log("Email sent");
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//       res.send({
//         data: data,
//         message: `Not found User with Email ${req.body.email}.`,
//       });
//     }
//   });
// };

exports.tokenreset = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  User.ChangePass(
    req.body.token,
    req.body.password,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Token miss match.`,
          });
        }
      } else {
        console.log(data);
        res.send({
          data: data,
          message: `Password forgot successfully please try to login with email ${req.body.email}.`,
        });
      }
    }
  );
};