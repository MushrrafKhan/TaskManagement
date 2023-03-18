const Holiday = require("../models/holiday.model.js");

// Create and Save a new holiday
exports.create = (req, res) => {
  
};

// Retrieve all holiday from the database.
exports.findAll = (req, res) => {
  
};

// Find a single holiday with a holidauId
exports.findOne = (req, res) => {
  
};

// Update a holiday identified by the holidayId in the request
exports.update = (req, res) => {
  
};

// Delete a holiday with the specified holidayId in the request
exports.delete = (req, res) => {
  
};

// Delete all holiday from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a holiday
    const holiday = new Holiday({
      name: req.body.name,
      holiday_date: req.body.holiday_date,
      status: req.body.status,
      department_id: req.body.department_id,
     // created_at: req.body.created_at,
     // updated_at: req.body.updated_at


    });
  
    // Save holiday in the database
    Holiday.create(holiday, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the holiday."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    Holiday.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving holiday."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Holiday.findById(req.params.holidayId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Holiday with id ${req.params.holidayId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Holiday with id " + req.params.holidayId
          });
        }
      } else res.send(data);
    });
  };

  exports.getByDate = (req, res) => {
    Holiday.getByDate(req.params.date, (err, datas) => {
      if (err) {
        if (err.kind === "not_found") {
          var response = {
            status:false,
            msg:"Data not found with date"+$req.params.date,
            data:[]
          }
          res.send(response);
          res.status(404).send({
            message: `Not found Holiday with date ${req.params.date}.`
          });
        } else {
          var response = {
            status:false,
            msg:"Error retrieving Holiday with date " + req.params.date,
            data:[]
          }
          res.send(response);
        }
      } else {
        console.log(datas);
        var response = {
          status:true,
          msg:"Data get successfully",
          data:datas.name
        }
        res.send(response);
      }
    })
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Holiday.updateById(
      req.params.holidayId, new Holiday(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Holiday with id ${req.params.holidayId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Holiday with id " + req.params.holidayId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = (req, res) => {
    Holiday.remove(req.params.holidayId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Holiday with id ${req.params.holidayId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Holiday with id " + req.params.holidayId
          });
        }
      } else res.send({ message: `Holiday was deleted successfully!` });
    });
  };
  
  exports.deleteAll = (req, res) => {
    Holiday.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all holiday."
        });
      else res.send({ message: `All Holiday were deleted successfully!` });
    });
  };