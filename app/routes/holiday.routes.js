module.exports = app => {
    const Holiday = require("../controllers/holiday.controller.js");
  
    // Create a new holiday
    app.post("/holiday", Holiday.create);
  
    // Retrieve all holiday
    app.get("/holiday", Holiday.findAll);
  
    // Retrieve a single holiday with holidayId
    app.get("/holiday/:holidayId", Holiday.findOne);

    app.get("/holiday/bydate/:date", Holiday.getByDate);
  
    // Update a holiday with holidayId
    app.put("/holiday/:holidayId", Holiday.update);
  
    // Delete a holiday with holidayId
    app.delete("/holiday/:holidayId", Holiday.delete);
  
    // Create a new holiday
    app.delete("/holiday", Holiday.deleteAll);
  };