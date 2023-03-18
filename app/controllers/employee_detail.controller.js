const Employee_detail = require("../models/employee_detail.model.js");

// Create and Save a new Employee_detail
exports.create = (req, res) => {
  
};

// Retrieve all Employee_detail from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Employee_detail with a Employee_detailId
exports.findOne = (req, res) => {
  
};

// Update a employee_detail identified by the employee_detailId in the request
exports.update = (req, res) => {
  
};

// Delete a employee_detail with the specified employee_detailId in the request
exports.delete = (req, res) => {
  
};

// Delete all employee_detail from the database.
exports.deleteAll = (req, res) => {
  
};

exports.findOneDetail = (req, res) => { 

 };

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    // Create a employee_detail
    const employee_detail = new Employee_detail({
        user_id: req.body.user_id,
        department_id: req.body.department_id,
        official_email: req.body.official_email,
        emp_photo: req.body.emp_photo,
        dob: req.body.dob,
        gender: req.body.gender,
        blood_group: req.body.blood_group,
        personal_email: req.body.personal_email,
        aadhar_number: req.body.aadhar_number,
        pan_number: req.body.pan_number,
        contact_number_1	: req.body.contact_number_1	,
        marital_status: req.body.marital_status,
        date_of_anniversary: req.body.date_of_anniversary,
        date_of_joining: req.body.date_of_joining,
        manager_id: req.body.manager_id,
        designation_id: req.body.designation_id,
        status: req.body.status,
     //   created_at: req.body.created_at,
      //  updated_at: req.body.updated_at
    });
  
    // Save employee_detail in the database
    Employee_detail.create(employee_detail, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the employee_detail."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    Employee_detail.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving employee_detail."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Employee_detail.findById(req.params.employee_detailId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee_detail with id ${req.params.employee_detailId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Employee_detail with id " + req.params.employee_detailId
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Employee_detail.updateById(
      req.params.employee_detailId,
      new Employee_detail(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Employee_detail with id ${req.params.employee_detailId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Employee_detail with id " + req.params.employee_detailId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Employee_detail.remove(req.params.employee_detailId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee_detail with id ${req.params.employee_detailId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Employee_detail with id " + req.params.employee_detailId
          });
        }
      } else res.send({ message: `Employee_detail was deleted successfully!` });
    });
  };
  
  exports.deleteAll = (req, res) => {
    Employee_detail.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all employee_detail."
        });
      else res.send({ message: `All Employee_detail were deleted successfully!` });
    });
  };

exports.findOneDetail = (req, res) => {  
    Employee_detail.findByUserId(req.params.user_id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Employee_detail with user_id ${req.params.user_id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Employee_detail with user_id " + req.params.user_id
          });
        }
      } else res.send(data);
    });
  };