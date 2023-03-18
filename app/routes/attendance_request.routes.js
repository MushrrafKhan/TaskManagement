module.exports = app => {
    const request = require("../controllers/attendance_request.controller.js");
    app.post("/attendanceRequest", request.attandRequest);
    app.get("/attendanceRequest", request.findAll);
    //app.post("/attandanceRequesta", request.attandRequest);
    app.post("/attendanceRequest", request.create);
    app.get("/attendanceRequest", request.findAll);
    app.put("/attendanceRequest/update", request.update);

    //app.post("/attandanceRequesta/", request.attandanceRequest);
}