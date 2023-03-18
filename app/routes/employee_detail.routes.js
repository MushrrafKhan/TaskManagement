module.exports = app => {
    const employee_detail = require("../controllers/employee_detail.controller.js");
  
    // Create a new Employee_detail
    app.post("/employee_detail", employee_detail.create);
  
    // Retrieve all Employee_detail
    app.get("/employee_detail", employee_detail.findAll);
  
    // Retrieve a single Employee_detail with employee_detailId
    app.get("/employee_detail/:employee_detailId", employee_detail.findOne);
  
    // Update a Employee_detail with employee_detailId
    app.put("/employee_detail/:employee_detailId", employee_detail.update);
  
    // Delete a Employee_detail with employee_detailId
    app.delete("/employee_detail/:employee_detailId", employee_detail.delete);
  
    // Create a new Employee_detail
    app.delete("/employee_detail", employee_detail.deleteAll);

// get employee detail by user
    app.get("/employeeDetailByUser/:user_id", employee_detail.findOneDetail);
  };