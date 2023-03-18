module.exports = app => {
    const leave_type = require("../controllers/leave_type.controller.js");
  
    // Create a new leave_type
    app.post("/leave_type", leave_type.create);


    // Retrieve all leave_type
    app.get("/leave_type", leave_type.findAll);


    // Retrieve a single leave_type with leave_typeId
    app.get("/leave_type/:leave_typeId", leave_type.findById);


    // Update a leave_type with leave_typeId
    app.put("/leave_type/:leave_typeId", leave_type.update);


    // Delete a leave_type with leave_typeId
    app.delete("/leave_type/:leave_typeId", leave_type.delete);

    
    // Create a new leave_type
    app.delete("/leave_type", leave_type.deleteAll);
};