const Company = require("../models/company.model.js");

// Create and Save a new company
exports.create = (req, res) => {
  
};

// Retrieve all companys from the database.
exports.findAll = (req, res) => {
  
};

// Find a single company with a companyId
exports.findOne = (req, res) => {
  
};

// Update a company identified by the companyId in the request
exports.update = (req, res) => {
  
};

// Delete a company with the specified companyId in the request
exports.delete = (req, res) => {
  
};

// Delete all companys from the database.
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
    const company = new Company({
        name: req.body.name,
      //  account_holder: req.body.account_holder,
      //  logo: req.body.logo,
        country_id: req.body.country_id,
        state_id: req.body.state_id,
        city_id: req.body.city_id,
        address: req.body.address,
       // registration_date: req.body.registration_date,
        status: req.body.status,
       // fax: req.body.fax,
     email: req.body.email,
     //   reg_number: req.body.reg_number,
       pan_number: req.body.pan_number,
//tan_number: req.body.tan_number,
      //  empcode_prefix: req.body.empcode_prefix,
        contact_number_1: req.body.contact_number_1,
   //     contact_number_2: req.body.contact_number_2,
     //   contact_number_3: req.body.contact_number_3,
       // nature_of_business: req.body.nature_of_business,
       // legal_entity: req.body.legal_entity,
        //created_at: req.body.created_at,
        //updated_at: req.body.updated_at,
        is_completed: req.body.is_completed
    });
  
    // Save Comment in the database
    Company.create(company, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the company."
        });
      else res.send(data);
    });
  };


exports.findAll = (req, res) => {
    Company.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving company."
        });
      else res.send(data);
    });
  };

exports.findOne = (req, res) => {
    Company.findById(req.params.companyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found comapny with id ${req.params.companyId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving contact_person with id " + req.params.companyId
          });
        }
      } else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Company.findById(req.params.companyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found company with id ${req.params.companyId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving company with id " + req.params.companyId
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
  
Company.updateById(
      req.params.companyId,
      new Company(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found company with id ${req.params.companyId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating contact_person with id " + req.params.companyId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Company.remove(req.params.companyId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found company with id ${req.params.companyId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete company with id " + req.params.companyId
          });
        }
      } else res.send({ message: `company was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Company.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Company."
        });
      else res.send({ message: `All company were deleted successfully!` });
    });
  };