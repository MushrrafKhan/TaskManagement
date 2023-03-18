const db = require("../models");
var path = require("path");
const multer = require("multer");
var path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "comment_img/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
    var imageName =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, imageName);
  },
});

exports.createComment = (req, res) => {
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
      console.log("--image----!", req.files);
      console.log("--image----!", req.body.image);

      // var date = dateFormat(new Date(), "yyyy-mm-dd");
      // var time = dateFormat(new Date(), "h:MM:ss");
      var imageData = [];
      var storyData = [];
      if (req.files.length > 0) {
        console.log('------------!')
        req.files.forEach(async (image, key) => {
          imageData[key] = image.filename;
          await db.comment.create({
            task_id: req.body.task_id,
            user_id: req.body.user_id,
            comment: req.body.comment,
            image: image.filename,
          });
        });
        if (imageData.length > 0) {
          res.send({
            status: true,
            msg: "Record insert successfully.",
            data: imageData,
          });
        } else {
          res.send({
            status: false,
            msg: "Error while creating tutorial.",
            data: {},
          });
        }
      } else {
        return db.comment
          .create({
            task_id: req.body.task_id,
            user_id: req.body.user_id,
            comment: req.body.comment,
            image: req.body.image,
          })
          .then((comment) => {
            console.log("TEST");
            var data = {
              status: true,
              msg: "Record insert successfully",
              data: comment,
            };
            res.send(data);
          })
          .catch((err) => {
            var data = {
              status: false,
              msg: "Error while creating tutorial" + err,
              data: [],
            };
            res.send(data);
          });
      }
    });
  } catch (e) {
    res.send({
      status: false,
      msg: "Error while creating tutorial." + e,
      data: {},
    });
  }
};

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  console.log("YES I AM INSIDE", req.body);
  return db.comment
    .create({
      task_id: req.body.task_id,
      user_id: req.body.user_id,
      comment: req.body.comment,
    })
    .then((comment) => {
      console.log("TEST");
      var data = {
        status: true,
        msg: "Record insert successfully",
        data: comment,
      };
      res.send(data);
    })
    .catch((err) => {
      var data = {
        status: false,
        msg: "Error while creating tutorial" + err,
        data: [],
      };
      res.send(data);
    });
};

exports.findAll = (req, res) => {
  return db.comment
    .findAll({
      where: {
        task_id: req.params.task_id,
      },

      include: [
        {
          attribute: ["id"],
          model: db.users,
          as: "commentBy",
        },
      ],
    })
    .then((comment) => {
      console.log(res);
      var data = {
        status: true,
        msg: "findAll comment successfully",
        data: comment,
      };
      res.send(data);
    })
    .catch((err) => {
      var data = {
        staus: false,
        msg: "Error findAll comment",
        data: err,
      };
      res.send(data);
    });
};

exports.commentReply = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // console.log("YES I AM INSIDE",req.body);
  return db.comment_reply
    .create({
      comment_id: req.body.comment_id,
      reply_by: req.body.reply_by,
      reply: req.body.reply,
    })
    .then((comment) => {
      console.log("TEST");
      var data = {
        status: true,
        msg: "Record insert successfully",
        data: comment,
      };
      res.send(data);
    })
    .catch((err) => {
      var data = {
        status: false,
        msg: "Error while creating tutorial" + err,
        data: [],
      };
      res.send(data);
    });
};
