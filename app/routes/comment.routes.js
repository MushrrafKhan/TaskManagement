module.exports = app => {
    const comment = require("../controllers/comment.controller.js");
  
    // Create a new comment
    app.post("/comments", comment.create);

    app.post("/comment/create", comment.createComment);
  
    // // Retrieve all comment
    app.get("/comment/:task_id", comment.findAll);

    app.post("/comment_reply", comment.commentReply);

  
    // // Retrieve a single comment with commentId
    // app.get("/comment/:commentId", app.findOne);
  
    // // Update a comment with commentId
    // app.put("/comment/:commentId", app.update);
  
    // // Delete a comment with commentId
    // app.delete("/comment/:commentId", app.delete);
  
    // // Create a new comment
    // app.delete("/comment", comment.deleteAll);

    // // Retrieve a single comment with taskId
    // app.get("/cmnt/:task_id", comment.findComment);

      };
  