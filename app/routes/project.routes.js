module.exports = app => {
    const project = require("../controllers/project.controller.js");
  
    // Create a new project
    app.post("/project", project.create);
  
    // Retrieve all project
    app.get("/project", project.findAll);
  
    // Retrieve a single project with projectId
    app.get("/project/:projectId", project.findOne);
  
    // Update a project with projectId
    app.put("/project/:projectId", project.update);
  
    // Delete a project with projectId
    app.delete("/project/:projectId", project.delete);
  
    // Create a new project
    app.delete("/project", project.deleteAll);

    app.get("/getProjectLimited", project.getProjectlimited);

      };
  