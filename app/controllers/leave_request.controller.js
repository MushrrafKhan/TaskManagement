const Leave_request = require("../models/leave_request.model.js");
const User = require("../models/user.model.js");
var dateFormant = require('dateformat');
var date = dateFormant(new Date(), "yyyy-mm-dd h:MM:s");
var time = dateFormant (new Date(), "h:mm:ss");
//var date = dateFormat(new Date(), "yyyy-mm-dd h:MM:s");


exports.create = (req, res) => {

};
exports.findAll = (req, res) => {
};
exports.findOne = (req, res) => {
};
exports.update = (req, res) => {
};
exports.delete = (req, res) => {
};
exports.deleteAll = (req, res) => {
};

exports.create = (req, res) => {

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    User.findByRole('hr', (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Hr not found in database please assign someone to hr role.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving user with role " + req.role
            });
          }
        } else {

              const leave_request = new Leave_request({
                request_reason: req.body.request_reason,
                day_type: req.body.day_type,
                emp_id: req.body.emp_id,
                start_date: req.body.start_date,  
                end_date: req.body.end_date,  
                leave_message: req.body.leave_message,
                createdAt: date,
                updatedAt: date,
                hr_remark: req.body.hr_remark,
                status: req.body.status,
                hr_id: data['id'], 
                leave_type_id: req.body.leave_type_id,
              });

             Leave_request.create(leave_request, (err, data) => {
                if(err) 
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while creating the Leave_request."
                    })
                else res.send(data);
                });
          }
    });
};

exports.findAll = (req, res) => {
    Leave_request.getAll((err, data) => {
        if(err) 
      res.status(500).send({
          message:
          err.message || "Some error occurred while retrieving Leave_request."
      });
          
      else res.send(data);
    });
};

exports.findOne = (req, res) => {
   Leave_request.getById(req.params.emp_id, (err, data) => {
       if (err) {
           if(err.kind === " not found") {
               res.status(404).send({
                   message: `not found leave_type with Id ${req.params.emp_id}.`
               });
           }
           else {
               res.status(500).send({
                   message: "Error retrieving leave_type with id" + req.params.emp_id
               });
           }
       } 
       else res.send(data);
   });
};


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    Leave_request.updateById (
        req.params.leave_requestId, 
        new Leave_request(req.body), 
        (err, data) =>  {
            if (err) {
                if (err.kind === "not found") {
                    res.status(404).send({
                        message: `not found leave_request with id ${req.params.leave_requestId}.`
                    });
                } 
                else {
                    res.status(500).send({
                        message: "error update with id" + req.params.leave_requestId
                    });
                }
            }
            else res.send(data);
        }
    );
};

exports.leave_approved = (req, res) => {
    var id = req.body.id;

    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    Leave_request.hrReqReply (
        req.params.leave_requestId, 
        new Leave_request(req.body), 
        (err, data) =>  {
            if (err) {
                if (err.kind === "not found") {
                    res.status(404).send({
                        message: `not found leave_request with id ${req.params.leave_requestId}.`
                    });
                } 
                else {
                    res.status(500).send({
                        message: "error update with id" + req.params.leave_requestId
                    });
                }
            }
            else res.send(data);
        }
    );
};

exports.delete = ( req ,res) => {
    Leave_request.remove(req.params.leave_requestId, (err,data) => {
        if(err) {
            if(err.kind === "not found"){
                res.status(404).send({
                    message: `not found leave_request with id ${req.params.leave_requestId}.`
                });
            }
            else {
                res.status(500).send({
                    message: " could not delete leave_request" + req.params.leave_requestId
                });
            }
        }
        else res.send({ message: "delete was successfully"});
    });
};

exports.deleteAll = (req, res) => {
    Leave_request.removeAll((err,data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while removing all leave_request."
        });
        else res.send({message: `All Leave_request were deleted successfully!`});
    });
}; 

exports.findByEmpId = (req, res) => {
    Leave_request.getByEmpId(req.params.emp_id, (err, data) => {
        if (err) {
            if(err.kind === " not found") {
                res.status(404).send({
                    message: `not found leave_type with emp_id ${req.params.emp_id}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving leave_type with emp_id" + req.params.emp_id
                });
            }
        } 
        else res.send(data);
    });
 };