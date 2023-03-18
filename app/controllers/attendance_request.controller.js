const db = require("../models");
const request = db.request;
const resign = db.resign;




const sequelize = require('sequelize');

exports.create = (req,res) => {
    return request.create({
        attendance_id: req.body.attendance_id,
        emp_id: req.body.emp_id,
        date: req.body.date,
        start_time: req.body.start_time,
        end_time: req.body.end_time,
        status: req.body.status,
        comment: req.body.comment
    }).then((post) => {
        var data = {
            status: true,
            msg: 'create attendance request successfully',
            data:post,
        }
        res.send(data);
    }).catch((err)=> {
        var data = {
            status: false,
            msg:"Error while creating attendance request" + err,
            data:[],
        }
        res.send(data);
    });
};

exports.attandRequest = (req,res) => {
    var attendance_id = req.body.attendance_id;

    db.request.findOne({
        where: {
            attendance_id : attendance_id,
        }
    }).then(post => {
        console.log(post);
        if(post === null) {
            return request.create({
                attendance_id: req.body.attendance_id,
                emp_id: req.body.emp_id,
                date: req.body.date,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                comment: req.body.comment
            }).then((attandRequest) => {
                var data = {
                    status:true,
                    msg:'attandance request successfully',
                    data:attandRequest,
                }
                res.send(data);
                return;
            }).catch ((err) => {
                var data = {
                    status:false,
                    msg: 'Error while creating attandance request',
                    data: err,
                }
                res.send(data);
                return;
            })
        }else{
            var data = {
                status:false,
                msg:'already requested',
                data:[],
            }
            res.send(data);
        }
    })
}

exports.findAll = async(req,res) => {
    try {
        const AttendanceRequest = await request.findAll({
           
            order: [
                ['status','DESC'],
            ],
            include: [
                
                
                { 
                    attributes: ['id', 'user_name','image','email'],  
                  required: true,
                  model: db.users,
                  as: 'users',
                 },
                ]
    
        });
        const resignation = await resign.findAll({
            order: [
                ['status',"DESC"],
            ],
            include: [
                
                { 
                    attributes: ['id', 'user_name','image','email'],  
                  required: true,
                  model: db.users,
                  as: 'users',
                 },
                ]
    
        });
       const leaverequest = await db.leaverequest.findAll({
           order:[
               ['status',"DESC"],
           ],
           include: [
               {
                   attributes: ['id','user_name','image','email'],
                   required:true,
                   model:db.users,
                   as:'users',
               },
           ]
    
        });
        res.send({
            status:true,
            msg: 'findAll data successfully',
            data:{AttendanceRequest,resignation,leaverequest},
            
        });
        throw "thrown message";
        console.log("this message is never seen");
      }
      catch (e) {
        console.log("entering catch block");
        console.log(e);
        console.log("leaving catch block");
      }
    
    
     
};

exports.update = (req, res) => {
    var attendance_id = req.body.attendance_id;
    var status = req.body.status;
    db.request.update(req.body, {
      where: { 
        attendance_id : attendance_id,
        status : status
      }
    })
      .then(num => {
        console.log(res)
        if (num == 1) {
         var data = {
           status:true,
           'msg': 'attendance request updated successfully',
           data:num,
         }
         res.send(data);
        } else {
          var data = {
            status:false,
            data: {
              'msg': `Cannot update attendance with id=${id}. Maybe attendance was not found or request is empty!`,
            }
          }
            res.send(data);
        }
      })
      .catch(err => {
        var data = {
          status:false,
          'msg': 'Error updating attendance',
          data: err,
        }
        res.send(data);
      });
  };