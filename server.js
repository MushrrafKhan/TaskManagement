const express = require("express");
const bodyParser = require("body-parser");
 
const app = express();

var cors = require('cors')
var allowedOrigins = ['http://localhost:3000',
                      'http://localhost:4200'];
app.use(cors({  
  origin: function(origin, callback){
    // allow requests with no origin     
    // (like mobile apps or curl requests)    
    if(!origin) 
      return callback(null, true);    
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +                
          'allow access from the specified Origin.';      
      return callback(new Error(msg), false);    
    }    
    return callback(null, true);  
  }
}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/user.routes.js")(app);
require("./app/routes/task.routes.js")(app);
require("./app/routes/comment.routes.js")(app);
require("./app/routes/further_assign.routes.js")(app);
require("./app/routes/project.routes.js")(app);
require("./app/routes/contact_person.routes.js")(app);
require("./app/routes/company.routes.js")(app);
require("./app/routes/department.routes.js")(app);
require("./app/routes/country.routes.js")(app);
require("./app/routes/state.routes.js")(app);
require("./app/routes/city.routes.js")(app);
require("./app/routes/employee_detail.routes.js")(app);
require("./app/routes/branches.routes.js")(app);
require("./app/routes/task_docs.routes.js")(app);
require("./app/routes/holiday.routes.js")(app);
require("./app/routes/leave_type.routes.js")(app);
require("./app/routes/leave_request.routes.js")(app);
require("./app/routes/attendance.routes.js")(app);
require("./app/routes/resignation.routes.js")(app);
require("./app/routes/attendance_request.routes.js")(app);


// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
