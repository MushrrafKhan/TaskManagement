module.exports = app => {
    const further_assign = require("../controllers/further_assign.controller.js");
  
    // Create a new further_assign
    app.post("/further_assign", further_assign.create);
  
    // Retrieve all further_assign
    app.get("/further_assign", further_assign.findAll);
  
    // Retrieve a single further_assign with further_assignId
    app.get("/further_assign/:further_assignId", further_assign.findOne);
  
    // Update a further_assign with further_assignId
    app.put("/further_assign/:further_assignId", further_assign.update);
  
    // Delete a further_assign with further_assignId
    app.delete("/further_assign/:further_assignId", further_assign.delete);
  
    // Create a new further_assign
    app.delete("/further_assign", further_assign.deleteAll);


      };
  