const Country = require("../models/country.model.js");

// Create and Save a new Country
exports.create = (req, res) => {
  
};

// Retrieve all Country from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Country with a countryId
exports.findOne = (req, res) => {
  
};

// Update a Country identified by the CountryId in the request
exports.update = (req, res) => {
  
};

// Delete a Country with the specified CountryId in the request
exports.delete = (req, res) => {
  
};

// Delete all Country from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Country
    const country = new Country({
      title: req.body.title,
      status: req.body.status,
     // created_at: req.body.created_at,
     // updated_at: req.body.updated_at


    });
  
    // Save Country in the database
    Country.create(country, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the country."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    Country.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving country."
        });
      else res.send(data);
    });
  };
 
  exports.findOne = (req, res) => {
    Country.findById(req.params.countryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Country with id ${req.params.countryId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Country with id " + req.params.countryId
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
  
    Country.updateById(
      req.params.countryId,
      new Country(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found City with id ${req.params.countryId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Country with id " + req.params.countryId
            });
          }
        } else res.send(data);
      }
    );
  };
  exports.delete = (req, res) => {
    Country.remove(req.params.countryId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Country with id ${req.params.countryId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Country with id " + req.params.countryId
          });
        }
      } else res.send({ message: `Country was deleted successfully!` });
    });
  };
  
  exports.deleteAll = (req, res) => {
    Country.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all country."
        });
      else res.send({ message: `All Country were deleted successfully!` });
    });
  };

