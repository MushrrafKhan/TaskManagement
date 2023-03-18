module.exports = app => {
    const task_docs = require("../controllers/task_docs.controller.js");
  


    app.post("/task_docs", task_docs.create);
  
    // Retrieve all task_docs
    app.get("/task_docs", task_docs.findAll);
  
    // Retrieve a single task_docs with task_docsId
    app.get("/task_docs/:task_docsId", task_docs.findOne);
  
    // Update a task_docs with task_docsId
    app.put("/task_docs/:task_docsId", task_docs.update);
  
    // Delete a task_docs with task_docsId
    app.delete("/task_docs/:task_docsId", task_docs.delete);
  
    // Create a new task_docs
    app.delete("/task_docs", task_docs.deleteAll);

    // upload docs in task
    app.post("/task_docs/img/:task_docsId", task_docs.uploadImage);

};