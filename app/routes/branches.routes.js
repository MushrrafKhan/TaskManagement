module.exports = app => {
    const branches = require("../controllers/branches.controller.js");
  
    // Create a new branches
    app.post("/branches", branches.create);
  
    // Retrieve all branches
    app.get("/branches", branches.findAll);
  
    // Retrieve a single branches with branchesId
    app.get("/branches/:branchesId", branches.findOne);
  
    // Update a branches with branchesId
    app.put("/branches/:branchesId", branches.update);
  
    // Delete a branches with branchesId
    app.delete("/branches/:branchesId", branches.delete);
  
    // Create a new branches
    app.delete("/branches", branches.deleteAll);
  };