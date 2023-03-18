module.exports = app => {
    const contact_person = require("../controllers/contact_person.controller.js");
  
    // Create a new contact_person
    app.post("/contact_person", contact_person.create);
  
    // Retrieve all contact_person
    app.get("/contact_person", contact_person.findAll);
  
    // Retrieve a single contact_person with contact_personId
    app.get("/contact_person/:contact_personId", contact_person.findOne);
  
    // Update a contact_person with contact_personId
    app.put("/contact_person/:contact_personId", contact_person.update);
  
    // Delete a contact_person with contact_personId
    app.delete("/contact_person/:contact_personId", contact_person.delete);
  
    // Create a new contact_person
    app.delete("/contact_person", contact_person.deleteAll);

      };
  