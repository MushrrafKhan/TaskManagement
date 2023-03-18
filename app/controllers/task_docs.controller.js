const Task_docs = require("../models/task_docs.model.js");

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

exports.uploadImage = (req, res) => {
  let upload = multer({ storage: storage }).single("image");

  upload(req, res, function(err) {
    console.log(req.params.task_docsId,);

    Task_docs.taskImageUpdate(req.params.task_docsId,req.file.filename,(err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found task_docs with id ${req.params.task_docsId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating task_docs with id " + req.params.task_docsId
            });
          }
        } else{
          console.log(req.file.filename);
      res.send({response:req.file,'test':'test'});
        }
      }
    );
      
  });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a task_docs
    const task_docs = new Task_docs({
        task_id	: req.body.task_id,
        image: req.body.image,
        docs: req.body.docs,
     
    //  created_at: req.body.created_at,
   //   updated_at: req.body.updated_at,
      
    });
  
    // Save task_docs in the database
    Task_docs.create(task_docs, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the ."
        });
      else res.send(data);
    });
  };

  exports.findAll = (req, res) => {
    Task_docs.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving s."
        });
      else res.send(data);
    });
  };

  exports.findOne = (req, res) => {
    Task_docs.findById(req.params.task_docsId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found task_docs with id ${req.params.task_docsId}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving task_docs with id " + req.params.task_docsId
          });
        }
      } else res.send(data);
    });
  };


exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Task_docs.updateById(req.params.task_docsId, new Task_docs(req.body),(err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found task_docs with id ${req.params.task_docsId}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating task_docs with id " + req.params.task_docsId
            });
          }
        } else res.send(data);
      }
    );
  };

  exports.delete = (req, res) => {
    Task_docs.remove(req.params.task_docsId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found task_docs with id ${req.params.task_docsId}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete task_docs with id " + req.params.task_docsId
          });
        }
      } else res.send({ message: `task_docs was deleted successfully!` });
    });
  };

  exports.deleteAll = (req, res) => {
    Task_docs.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all task_docs."
      });
    else res.send({ message: `All task_docs were deleted successfully!` });
  });
};