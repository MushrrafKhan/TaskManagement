const State = require("../models/state.model.js");

// Create and Save a new State
exports.create = (req, res) => {
  
};

// Retrieve all State from the database.
exports.findAll = (req, res) => {
  
};

// Find a single state with a stateId
exports.findOne = (req, res) => {
  
};

// Update a State identified by the StateId in the request
exports.update = (req, res) => {
  
};

// Delete a state with the specified StateId in the request
exports.delete = (req, res) => {
  
};

// Delete all StateId from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a State
    const state = new State({
      country_id: req.body.country_id,
      title: req.body.title,
     // status: req.body.status,
     // created_at: req.body.created_at,
     // updated_at: req.body.updated_at


    });
  
    // Save state in the database
    State.create(state, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the state."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    State.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving state."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    State.findById(req.params.stateId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found State with id ${req.params.stateId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving State with id " + req.params.stateId
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
  
    State.updateById(
      req.params.stateId,
      new State(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found State with id ${req.params.stateId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating State with id " + req.params.stateId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = (req, res) => {
    State.remove(req.params.stateId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found State with id ${req.params.stateId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete State with id " + req.params.stateId
          });
        }
      } else res.send({ message: `State was deleted successfully!` });
    });
  };
  
  exports.deleteAll = (req, res) => {
    State.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all state."
        });
      else res.send({ message: `All State were deleted successfully!` });
    });
  };