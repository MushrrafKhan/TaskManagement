const Contact_person = require("../models/contact_person.model.js");

// Create and Save a new contact_person
exports.create = (req, res) => {
  
};

// Retrieve all contact_persons from the database.
exports.findAll = (req, res) => {
  
};

// Find a single contact_person with a contact_personId
exports.findOne = (req, res) => {
  
};

// Update a contact_person identified by the contact_personId in the request
exports.update = (req, res) => {
  
};

// Delete a contact_person with the specified contact_personId in the request
exports.delete = (req, res) => {
  
};

// Delete all contact_persons from the database.
exports.deleteAll = (req, res) => {
  
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a contact_person
    const contact_person = new Contact_person({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        created_by: req.body.create_by,
       // created_at: req.body.create_at,
        //updated_at: req.body.updated_at
    });
  
    // Save Comment in the database
    Contact_person.create(contact_person, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Contact_person."
        });
      else res.send(data);
    });
  };

exports.findAll = (req, res) => {
    Contact_person.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contact_person."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    Contact_person.findById(req.params.contact_personId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found contact_person with id ${req.params.contact_personId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving contact_person with id " + req.params.contact_personId
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
  
    Contact_person.updateById(req.params.contact_personId,new Contact_person(req.body),(err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found contact_person with id ${req.params.contact_personId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating contact_person with id " + req.params.contact_personId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Contact_person.remove(req.params.contact_personId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found contact_person with id ${req.params.contact_personId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete contact_person with id " + req.params.contact_personId
          });
        }
      } else res.send({ message: `contact_person was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Contact_person.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Contact_person."
        });
      else res.send({ message: `All comment were deleted successfully!` });
    });
  };
