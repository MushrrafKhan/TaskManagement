module.exports = app => {
    const department = require("../controllers/department.controller.js");
  
    // Create a new department
    app.post("/department", department.create);
  
    // Retrieve all department
    app.get("/department", department.findAll);
  
    // Retrieve a single department with departmentId
    app.get("/department/:departmentId", department.findOne);
  
    // Update a department with departmentId
    app.put("/department/:departmentId", department.update);
  
    // Delete a department with departmentId
    app.delete("/department/:departmentId", department.delete);
  
    // Create a new department
    app.delete("/department", department.deleteAll);

    app.get("/dep/:branches_id", department.findDep);


      };
  