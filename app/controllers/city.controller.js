const City = require("../models/city.model.js");

// Create and Save a new City
exports.create = (req, res) => {
  
};

// Retrieve all city from the database.
exports.findAll = (req, res) => {
  
};

// Find a single city with a cityId
exports.findOne = (req, res) => {
  
};

// Update a city identified by the cityId in the request
exports.update = (req, res) => {
  
};

// Delete a city with the specified cityId in the request
exports.delete = (req, res) => {
  
};

// Delete all city from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a city
    const city = new City({
      state_id: req.body.state_id,
      title: req.body.title,
      status: req.body.status,
     // created_at: req.body.created_at,
     // updated_at: req.body.updated_at


    });
  
    // Save city in the database
    City.create(city, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the city."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    City.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving city."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    City.findById(req.params.cityId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found City with id ${req.params.cityId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving City with id " + req.params.cityId
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
  
    City.updateById(
      req.params.cityId, new City(req.body), (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found City with id ${req.params.cityId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating City with id " + req.params.cityId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = (req, res) => {
    City.remove(req.params.cityId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found City with id ${req.params.cityId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete City with id " + req.params.cityId
          });
        }
      } else res.send({ message: `City was deleted successfully!` });
    });
  };
  
  exports.deleteAll = (req, res) => {
    City.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all city."
        });
      else res.send({ message: `All City were deleted successfully!` });
    });
  };