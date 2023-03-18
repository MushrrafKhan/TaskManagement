const Leave_type = require("../models/leave_type.model.js");
//create and seve a new leave_type
exports.create = (req, res) => {

};

//Retriveve all Leave_type from the database.
exports.findAll = (req, res) => {

};

//find a single city whit a leave_typeId.
exports.findById = (req, res) => {

};

// Update a city identified by the cityId in the request.
exports.update = (req, res) => {

};

// Delete a city with the specified cityId in the request.
exports.delete = (req, res) => {

};
//delete all leave_type from the database.
exports.deleteAll = (req, res) => {

};

exports.create = (req, res) => {
if (!req.body) {
  res.status(404).send({
    message: "Content can not be empty!"
  });
}
  //create a leave_type
  const leave_type = new Leave_type({
    name: req.body.name,
    representation: req.body.representation,
    color_code: req.body.color_code,
    paid: req.body.paid,
    company_id: req.body.company_id
  });
  
  Leave_type.create(leave_type, (err, data) => {
    if(err) 
    res.status(500).send({
      massage:
      err.massage || "Some error occurred while creating the kjhkj."
    });
    else res.send(data);
  });

};

exports.findAll = (req, res) => {
  Leave_type.getAll((err, data) => {
    if (err)
    res.status(500).send({
      message:
      res.message || "Some error occurred while retrieving leave_type."
    });
    else res.send(data);
  });
};

exports.findById = (req, res) => {
  Leave_type.getById(req.params.leave_typeId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `not found leave_type with Id ${req.params.leave_typeId}.`
        }); 
      }

      else {
        res.status(500).send({
          message:"Error retrieving leave_type with id " + req.params.leave_typeId
        });
      }
    }  
    else res.send(data);
  });
};

exports.update = (req, res) => {
  if (!req.body) {
    res.status(500).send({
      message: "content con not by empty!"
    });
  }

  Leave_type.updateById(
    req.params.leave_typeId, new Leave_type(req.body), (err, data) => {
      if(err) {
        if (err.kind === "not found") {
          res.status(404).send({
            message: `not fount leave_type with Id ${req.params.leave_typeById}.`
          });
        }
        else {
          res.status(500).send({
            message: "error updating with id" + req.params.leave_typeById
          });
        }
      }
      else res.send(data);
    });

};

exports.delete = (req, res) => {
Leave_type.remove(req.params.leave_typeId, (err,data) => {
  if(err) {
    if(err.kind === "not found"){
      res.status(404).send({
        message: `not found leave_type with id ${req.params.leave_typeId}.`
      });
    }
    else {
      res.status(500).send({
        message: "Could not delete City with id " +req.params.leave_typeId
      });
    }
  }   else res.send({message: "delete was successfully"});
});

};

exports.deleteAll = (req, res) => {
  Leave_type.removeAll((err,data) => {
    if(err) 
      res.status(500).send({
        message:
       err.message || "Some error occurred while removing all city."
      });

      else res.send({message: `All City were deleted successfully!`});
    
  });
};