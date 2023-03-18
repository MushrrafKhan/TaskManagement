var Branches = require("../models/branches.model.js");

// Create and Save a new branches
exports.create = (req, res) => {
  
};

// Retrieve all branches from the database.
exports.findAll = (req, res) => {
  
};

// Find a single branches with a branchesId
exports.findOne = (req, res) => {
  
};

// Update a branches identified by the branchesId in the request
exports.update = (req, res) => {
  
};

// Delete a branches with the specified branchesId in the request
exports.delete = (req, res) => {
  
};

// Delete all branches from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a branches
    const branches = new Branches({
      name: req.body.name,
      status: req.body.status,
      address: req.body.address,
      phone: req.body.phone,
     // created_at: req.body.created_at,
     // updated_at: req.body.updated_at


    });
  
    // Save branches in the database
    Branches.create(branches, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the branches."
        });
      else res.send(data);
    });
  };

exports.findAll = (req, res) => {
    Branches.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving branches."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    Branches.findById(req.params.branchesId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Branches with id ${req.params.branchesId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Branches with id " + req.params.branchesId
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
  
    Branches.updateById(req.params.branchesId,new Branches(req.body),(err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Branches with id ${req.params.branchesId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating branches with id " + req.params.branchesId
            });
          }
        } else res.send(data);
      }
    );
  };

exports.delete = (req, res) => {
    Branches.remove(req.params.branchesId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found branches with id ${req.params.branchesId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete branches with id " + req.params.branchesId
          });
        }
      } else res.send({ message: `branches was deleted successfully!` });
    });
  };

exports.deleteAll = (req, res) => {
    Branches.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all branches."
        });
      else res.send({ message: `All branches were deleted successfully!` });
    });
  };