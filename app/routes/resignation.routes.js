module.exports = app => {
    const resign = require("../controllers/resignation.controller.js");
    app.post("/resign", resign.create);
    app.get("/resign", resign.findAll);
    app.put("/resign/:id",resign.update);
   
  };