const Further_assign = require("../models/further_assign.model.js");

// Create and Save a new Further_assign
exports.create = (req, res) => {
  
};

// Retrieve all Further_assigns from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Further_assign with a Further_assignId
exports.findOne = (req, res) => {
  
};

// Update a Further_assign identified by the Further_assignId in the request
exports.update = (req, res) => {
  
};

// Delete a Further_assign with the specified Further_assignId in the request
exports.delete = (req, res) => {
  
};

// Delete all Further_assigns from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a further_assign
    const further_assign = new Further_assign({
        user_id: req.body.user_id,
        task_id: req.body.task_id,
       created_at: req.body.created_at,
        updated_at: req.body.updated_at
    });
  
    // Save Customer in the database
    Further_assign.create(further_assign, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Customer."
        });
      else res.send(data);
    });
  };
  
exports.findAll = (req, res) => {
    Further_assign.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving further_assigns."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
Further_assign.findById(req.params.further_assignId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found further_assign with id ${req.params.further_assignId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving further_assign with id " + req.params.further_assignId
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
  
    Further_assign.updateById(
      req.params.further_assignId,
      new Further_assign(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Further_assign with id ${req.params.further_assignId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating further_assign with id " + req.params.further_assignId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Further_assign.remove(req.params.further_assignId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found further_assign with id ${req.params.further_assignId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete further_assign with id " + req.params.further_assignId
          });
        }
      } else res.send({ message: `further_assign was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Further_assign.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all further_assign."
        });
      else res.send({ message: `All further_assign were deleted successfully!` });
    });
  };