const db = require("../models/index.js");
const Attendance = db.attendance;
const sequelize = require('sequelize');

var dateFormat = require('dateformat');
var date = dateFormat(new Date(), "yyyy-mm-dd");
var time = dateFormat(new Date(), "h:MM:ss");

exports.create = (req, res) => {
    return Attendance.create({
        attendance_type_id: req.body.attendance_type_id,
        attendance_source_id: req.body.attendance_source_id,
        emp_id: req.body.emp_id,
        attendance_date: req.body.attendance_date,
        login_time: req.body.login_time,
        logout_time: req.body.logout_time,
    })
    .then((User) => {
        
      var data = {
          status : true,
          'msg' : 'Record insert successfully',
          data : User,
        }
        res.send(data);
    }).catch(err => {
      var data = {
        status : false,
        'msg' : 'Something wrong with request.',
        data : ''+err,
      }
      res.send(data);
  });
  };

  exports.findById = (req,res) => {
    console.log(req.params.user_id);
    return Attendance.findByPk(req.params.user_id)
      .then((post) => {
        if (post) {
          var response = {
            status : true,
            'msg' : 'Data fatch successfully',
            data : post,
          }
          res.send(response);
          
        }else {
          var response = {
            status : false,
            'msg' : 'Record not found  with user_id '+req.params.user_id,
            data : [],
          }
          res.send(response);
              }
      })
      .catch((err) => {
        var response = {
          status : false,
          'msg' : 'Something wrong with request: ' + err,
          data : err,
        }
        res.send(response);
      });
  };

  exports.delete = (req,res) => {
    return Attendance.destroy({where: {id: req.params.id}})
  .then((User) => {
    if(User){
      var data = {
        status : true,
        'msg' : 'saved delete successfully with id ' + req.params.id,
        data :User,
      }
      res.send(data);
    }else{
      var data = {
        status : false,
        data:{
          'msg' : 'data not found ' + req.params.id,
        }
      }
      res.send(data);
    }
  }).catch(err => {
    var data = {
      status : false,
      'msg' : 'Error deleting with id= '+id,
      data : err,
    }
    res.send(data);
});
  };
  exports.findAll = (req,res) => {
    return Attendance.findAll({
  
      
    }).then((Attendance) => {
      console.log(res)
      var data = {
        status:true,
        msg: 'findAll Attendance successfully',
        data:Attendance,
      }
      res.send(data);
    }).catch(err => {
      var data = {
        staus:false,
        msg: 'Error findAll Attendance',
        data:err,
      }
      res.send(data);
    })
  };
  exports.update = (req, res) => {
    const id = req.params.id;
  
    db.attendance.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Attendance was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Attendance with id=${id}. Maybe Attendance was not found or request is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Attendance with id=" + id
        });
      });
  };
  exports.taskUpdate = (req, res) => {
    Attendance.findOne({
      where: { 
        emp_id: req.body.emp_id,
        login_time: req.body.login_time
      }
    })
      .then(post => {
        // console.log(post);
        // console.log( req.params.story_id);
        // console.log( req.params.who_seen);

        if (post == null) {
          return Attendance.create({
            emp_id: req.body.emp_id,
            login_time: req.body.login_time,
            attendance_date: req.body.attendance_date,
            logout_time: req.body.logout_time
            
          }).then((Attendance) => {
            
            var data = {
              status:true,
              'msg': 'create new entry',
              data: Attendance,
            }
            res.send(data);
            return;
            })
            .catch((err) => {
              var data = {
                status:false,
                'msg':'>> Error while creating event:',
                data:err,
              }
              res.send(data);
              return;
            });
        } else {
          db.attendance.update(req.body, {
            where: {emp_id: req.body.emp_id,
            }
          }).then(num => {
            if (num == 1) {
              res.send({
                message: "attandance was updated successfully."
              });
            } else {
              res.send({
                message: `Cannot update attandance with id Maybe attandance was not found or request is empty!`
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating attandance with id="
            });
          });
      }
    })
      .catch(err => {
        var data = {
          status:true,
          'msg': 'Something wrong with request.'+err,
          data: {},
        }
        res.send(data);
        return;
      });
  };

//  
//     // var date = dateFormat(new Date(), "yyyy-mm-dd");
//     // var time = dateFormat(new Date(), "h:mm:ss");
//     return db.task.findOne({
//         where: {
//             user_id: req.body.user_id,
//             start_date: req.body.start_date,
//             due_date: req.body.due_date
//         }
//     }).then((data) => {
        
//         if(data == null){
//             return db.task.create({
//                 // date: date,
//                 // time: time,
//                 user_id: req.body.user_id,
//                 start_date: req.body.start_date,
//                 due_date: req.body.due_date,
//                 project_id:1,
//                 title:"this title",
//                 description:"this description",
//                 doc:"this doc",
//                 assign_to:1,
//                 close_date:121212,
//                 created_by:121212,
//             })
//             .then((posttask) => {
//                 var datas = {
//                     status:true,
//                     msg: 'task  insert successfully',
//                     data:posttask,
//                 }
//                 res.send(datas);
//             })
//             .catch((err) => {
//                 var datas = {
//                     status:false,
//                     msg: '>> Error while creating tutorial:',
//                     data:err,  
//                 }
//                 res.send(datas);
//             });
//         }else{
//             var response = {
//                 status: false,
//                 msg: "already task by you.",
//                 data: [],
//             }
//             res.send(response);
//         }
        
//     });
// };



  