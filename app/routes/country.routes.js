module.exports = app => {
    const country = require("../controllers/country.controller.js");
  
    // Create a new country
    app.post("/country", country.create);
  
    // Retrieve all country
    app.get("/country", country.findAll);
  
    // Retrieve a single country with countryId
    app.get("/country/:countryId", country.findOne);
  
    // Update a country with countryId
    app.put("/country/:countryId", country.update);
  
    // Delete a country with countryId
    app.delete("/country/:countryId", country.delete);
  
    // Create a new country
    app.delete("/country", country.deleteAll);
  };