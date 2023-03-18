module.exports = app => {
    const state = require("../controllers/state.controller.js");
  
    // Create a new state
    app.post("/state", state.create);
  
    // Retrieve all state
    app.get("/state", state.findAll);
  
    // Retrieve a single state with stateId
    app.get("/state/:stateId", state.findOne);
  
    // Update a state with stateId
    app.put("/state/:stateId", state.update);
  
    // Delete a state with stateId
    app.delete("/state/:stateId", state.delete);
  
    // Create a new state
    app.delete("/state", state.deleteAll);
  };