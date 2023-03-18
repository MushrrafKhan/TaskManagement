module.exports = app => {
    const task = require("../controllers/task.controller.js");
  
    // Create a new task
    app.post("/task", task.create);
    app.post("/taskCreate", task.createTask);
  
    // Retrieve all task
    app.get("/task", task.findAll);
   
    // Retrieve a single task with taskId
    app.get("/task/:taskId", task.findOne);
  
    // Update a task with taskId
    app.put("/task/:taskId", task.update);
  
    // Delete a task with taskId
    app.delete("/task/:taskId", task.delete);
  
    // Create a new task
    app.delete("/task", task.deleteAll);
    
    //Retrieve all task
    app.get("/taskData/:task_id", task.findAllData);

     //Retrieve all task
     app.get("/allTaskData/:project_id", task.findAllTask);

     //Retrieve all task
     app.get("/getMyTaskData/:user_id", task.findMyTask);

     app.get("/getTaskDesc/", task.findAllDesc);

    // app.get("/getStatus/:project_id/:status/:user_id", task.findAllStatus);

     app.get("/getStatus/:userId/:status/:pId", task.findAllStatus);

     app.get("/admin/getStatus/:status/:pId", task.findAllAdminStatus);

     app.put("/updateStatus/:user_id", task.updateStatusByUserId);

     app.put("/updateStatusByTask/:taskId", task.updateStatus);

     app.get("/task/detail/:taskId", task.taskDetail);

     app.get("/task/counts/:project_id", task.findByCount);
     app.get("/task/get-task/:userId", task.findsAll);


      };

    

    
  