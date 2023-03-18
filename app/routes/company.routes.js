module.exports = app => {
    const company = require("../controllers/company.controller.js");
  
    // Create a new company
    app.post("/company", company.create);
  
    // Retrieve all company
    app.get("/company", company.findAll);
  
    // Retrieve a single company with companyId
    app.get("/company/:companyId", company.findOne);
  
    // Update a company with companyId
    app.put("/company/:companyId", company.update);
  
    // Delete a company with companyId
    app.delete("/company/:companyId", company.delete);
  
    // Create a new company
    app.delete("/company", company.deleteAll);

      };
  