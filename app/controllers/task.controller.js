const Task = require("../models/task.model.js");
const db = require("../models");
const sequelize = require("sequelize");
const Tasks = db.task;
var path = require("path");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "task_create_img/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    var imageName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

// Create and Save a new task
exports.create = (req, res) => {};

// Retrieve all tasks from the database.
exports.findAll = (req, res) => {};

// Find a single task with a taskId
exports.findOne = (req, res) => {};

// Update a task identified by the taskId in the request
exports.update = (req, res) => {};

// Delete a task with the specified taskId in the request
exports.delete = (req, res) => {};

// Delete all tasks from the database.
exports.deleteAll = (req, res) => {};

exports.findStatus = (req, res) => {};

exports.findAllData = (req, res) => {};

exports.createTask = (req, res) => {
  try {
    let upload = multer({ storage: storage }).array("image", 10);
    upload(req, res, function (err) {
      if (!req.body) {
        res.send({
          status: false,
          smg: "Content can not be empty!",
          data: {},
        });
      }
      console.log("--image----", req.files);
      // var date = dateFormat(new Date(), "yyyy-mm-dd");
      // var time = dateFormat(new Date(), "h:MM:ss");
      var imageData = [];
      var storyData = [];
      req.files.forEach(async (image, key) => {
        imageData[key] = image.filename;
        await db.task.create({
          project_id: req.body.project_id,
          user_id: req.body.user_id,
          title: req.body.title,
          doc: req.body.doc,
          start_date: req.body.start_date,
          close_date: req.body.close_date,
          due_date: req.body.due_date,
          created_by: req.body.created_by,
          assign_to: req.body.assign_to,
          description: req.body.description,
          image: image.filename,
        });
      });
      if (imageData.length > 0) {
        res.send({
          status: true,
          msg: "Task was uploaded successfully.",
          data: imageData,
        });
      } else {
        return db.task.create({
          project_id: req.body.project_id,
          user_id: req.body.user_id,
          title: req.body.title,
          doc: req.body.doc,
          start_date: req.body.start_date,
          close_date: req.body.close_date,
          due_date: req.body.due_date,
          created_by: req.body.created_by,
          assign_to: req.body.assign_to,
          description: req.body.description,
        })
          .then((data) => {
            var response = {
              status: true,
              msg: "Task post successfully",
              data: data,
            };
            res.send(response);
          })
          .catch((err) => {
            var response = {
              status: false,
              msg: "Something wrong  request." + err,
              data: err,
            };
            res.send(response);
          });
      }
    });
  } catch (e) {
    res.send({
      status: false,
      msg: "Something wrong  request." + e,
      data: {},
    });
  }
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a task
  const task = new Task({
    project_id: req.body.project_id,
    user_id: req.body.user_id,
    title: req.body.title,
    description: req.body.description,
    doc: req.body.doc,
    assign_to: req.body.assign_to,
    start_date: req.body.start_date,
    due_date: req.body.due_date,
    close_date: req.body.close_date,
    status: req.body.status,
    created_by: req.body.created_by,
    created_at: req.body.created_at,
    updated_at: req.body.updated_at,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
  });

  // Save Customer in the database
  Task.create(task, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Task.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Task.findById(req.params.taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.taskId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving task with id " + req.params.taskId,
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Task.updateById(req.params.taskId, new Task(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.taskId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating task with id " + req.params.taskId,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Task.remove(req.params.taskId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with id ${req.params.taskId}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete task with id " + req.params.taskId,
        });
      }
    } else res.send({ message: `task was deleted successfully!` });
  });
};

exports.deleteAll = (req, res) => {
  Task.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all task.",
      });
    else res.send({ message: `All task were deleted successfully!` });
  });
};

exports.findAllData = (req, res) => {
  Task.findByTaskId(req.params.task_id, (err, data) => {
    console.log("controler", data);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found data with task_id ${req.params.task_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving task with task_id " + req.params.task_id,
        });
      }
    } else {
      console.log("TESt", data[0].id);
      Task.findByTaskIdComment(data[0].id, (err, comment) => {
        console.log("controler", data);
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found data with task_id ${req.params.task_id}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Error retrieving task with task_id " + req.params.task_id,
            });
          }
        } else {
          var response = {
            task: data[0],
            comments: comment,
          };
          res.send(response);
        }
      });
    }
  });
};

exports.findAllTask = (req, res) => {
  Task.findByProjectId(req.params.project_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with project_id ${req.params.project_id}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving task with project_id " + req.params.project_id,
        });
      }
    } else res.send(data);
  });
};

exports.findMyTask = (req, res) => {
  Task.findByUserId(req.params.user_id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with user_id ${req.params.user_id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving task with user_id " + req.params.user_id,
        });
      }
    } else res.send(data);
  });
};

exports.findAllDesc = (req, res) => {
  Task.findByDesc((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    else res.send(data);
  });
};

exports.findAllStatus = (req, res) => {
  Task.getAllStatus(
    req.params.status,
    req.params.pId,
    req.params.userId,
    (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving tasks.",
        });
      else res.send(data);
    }
  );
};

exports.findAllAdminStatus = (req, res) => {
  Task.getAllAdminStatus(req.params.status, req.params.pId, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tasks.",
      });
    else res.send(data);
  });
};

exports.findStatus = (req, res) => {
  Task.findByStatus(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found task with status ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving task with status " + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

exports.updateStatusByUserId = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Task.updateByUserId(req.params.user_id, new Task(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        var data = {
          status: false,
          msg: "Not found task with userId -" + req.params.user_id,
          data: err,
        };
        res.send(data);
      } else {
        res.status(500).send({
          message: "Error updating task with user_id " + req.params.user_id,
        });
      }
    } else {
      var data = {
        status: true,
        msg: "task update successfully with userId -" + req.params.user_id,
        data: data,
      };
      res.send(data);
    }
  });
};
exports.taskDetail = (req, res) => {
  return db.task
    .findByPk(req.params.taskId, {
      order: [["id", "DESC"]],
      include: [
        {
          model: db.comment,
          as: "comment",
          include: [
            {
              attribute: ["id"],
              model: db.users,
              as: "commentBy",
            },
            {
              model: db.comment_reply,
              as: "comment_reply",
              include: [
                {
                  attribute: ["id"],
                  model: db.users,
                  as: "reply_user",
                },
              ],
            },
          ],
        },
        {
          attributes: ["user_name", "status", "role", "email"],
          model: db.users,
          as: "assignTo",
        },
      ],
    })
    .then((datas) => {
      console.log(res);
      if (datas == null) {
        var data = {
          status: true,
          msg: "data not found",
          data: {},
        };
        res.send(data);
      } else {
        var data = {
          status: true,
          msg: "findAll fatch successfully",
          data: datas,
        };
        res.send(data);
      }
    })
    .catch((err) => {
      var data = {
        staus: false,
        msg: "Something wrong happened." + err,
        data: {},
      };
      res.send(data);
    });
};

exports.updateStatus = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Task.updateStatusById(req.params.taskId, new Task(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        var data = {
          status: false,
          msg: "Not fount task with userId -" + req.params.taskId,
          data: err,
        };
        res.send(data);
      } else {
        res.status(500).send({
          message: "Error updating task with id " + req.params.taskId,
        });
      }
    } else {
      var data = {
        status: true,
        msg: "task update successfully with taskId -" + req.params.taskId,
        data: data,
      };
      res.send(data);
    }
  });
};

// exports.findByCount = (req,res) => {
//     const project_id = req.params.project_id;
//     return db.task.findByPk(req.params.project_id, {
//         where: {project_id: project_id }
//     })
//       .then((post) => {
//         if (post) {
//           var response = {
//             status : true,
//             'msg' : 'Data fatch successfully',
//             data : post,
//           }
//           res.send(response);

//         }else {
//           var response = {
//             status : false,
//             'msg' : 'Record not found  with project_id '+req.params.project_id,
//             data : [],
//           }
//           res.send(response);
//               }
//       })
//       .catch((err) => {
//         var response = {
//           status : false,
//           'msg' : 'Something wrong with request: ' + err,
//           data : err,
//         }
//         res.send(response);
//       });
//   };

exports.findByCount = (req, res) => {
  return Tasks.findAll({
    attributes: [
      "id",
      "status",
      [sequelize.fn("COUNT", sequelize.col("id")), "count"],
    ],
    group: ["status"],
    where: {
      project_id: req.params.project_id,
    },
  })
    .then((post) => {
      if (post.length > 0) {
        var data = {
          status: true,
          msg: "task count successfully.",
          data: post,
        };
        res.send(data);
      } else {
        var data = {
          status: false,
          msg: "Record not found  with id " + req.params.project_id,
          data: [],
        };
        res.send(data);
      }
    })
    .catch((err) => {
      var data = {
        status: false,
        msg: "Something wrong with request:" + err,
        data: err,
      };
      res.send(data);
    });
};
exports.findsAll = (req, res) => {
  console.log(req.params.userId);
  return db.task
    .findAll({
      where: {
        project_id: req.params.userId,
      },
      include: [
        {
          attributes: ["id", "user_name", "image"],
          model: db.users,
          as: "user_detail",
        },
      ],
    })
    .then((data) => {
      if (data.length <= 0) {
        var response = {
          status: false,
          msg: "Data not found",
          data: [],
        };
        res.send(response);
        return;
      } else {
        var response = {
          status: true,
          msg: "Data fatch successfully",
          data: data,
        };
        res.send(response);
        return;
      }
    })
    .catch((err) => {
      var response = {
        status: false,
        msg: "Something wrong with request: " + err,
        data: err,
      };
      res.send(response);
      console.log(">> Error while creating tutorial: ", err);
    });
};
