module.exports = app => {
    const leave_request = require("../controllers/leave_request.controller.js");

    app.post("/leave_request", leave_request.create);

    app.get("/leave_request", leave_request.findAll);

    app.get("/leave_request/:emp_id", leave_request.findOne);

    app.put("/leave_request/:leave_requestId", leave_request.update);

    app.delete("/leave_request/:leave_requestId", leave_request.delete);

    app.delete("/leave_request", leave_request.deleteAll);

    app.put("/leave_type/:leave_requestId", leave_request.leave_approved);

    app.get("/leave_requestByAscByStatus/:emp_id", leave_request.findByEmpId);



};