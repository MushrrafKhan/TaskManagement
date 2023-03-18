module.exports = app => {
    const attendance = require("../controllers/attendance.controller.js");
    app.post("/attendance/post", attendance.create);
    app.delete("/attendance/remove/:id", attendance.delete);
    app.get("/attendance/get/:user_id", attendance.findById);
    app.get("/attendance/with_user", attendance.findAll);  
    app.put("/attendance/update/:id", attendance.update);
    app.post("/attendance/update", attendance.taskUpdate);  
  };