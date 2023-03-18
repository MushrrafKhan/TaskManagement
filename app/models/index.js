const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.attendance = require("./attendance.model.js")(sequelize, Sequelize);
db.task = require("./tasks.model")(sequelize, Sequelize);
db.comment = require("./comment.model")(sequelize, Sequelize);
db.users = require("./users.model")(sequelize, Sequelize);
db.request = require("./attendance_request.model")(sequelize, Sequelize);
db.comment_reply = require("./comment_reply.model")(sequelize, Sequelize);
db.leaverequest = require("./leave_requests.model.js")(sequelize, Sequelize);
db.resign = require("./resignation.model")(sequelize, Sequelize);
db.request.belongsTo(db.users, { foreignKey: "emp_id", as: "users" });
db.resign.belongsTo(db.users, { foreignKey: "emp_id", as: "users" });
db.leaverequest.belongsTo(db.users,{foreignKey: "emp_id", as:"users"});


db.task.hasMany(db.comment, { foreignKey: "task_id",as: "comment" ,order: [['id', 'DESC']]});
db.comment.hasMany(db.comment_reply, { foreignKey: "comment_id",as: "comment_reply" ,order: [['id', 'DESC']]});
db.comment.belongsTo(db.users, { foreignKey: "user_id", as: "commentBy" });
db.task.belongsTo(db.users, { foreignKey: "assign_to", as: "assignTo" });

db.task.belongsTo(db.users, { foreignKey: "user_id", as: "user_detail" });
db.comment_reply.belongsTo(db.users, { foreignKey: "reply_by", as: "reply_user" });









// db.post.associate = (models) => {
//   db.post.hasMany(db.post_images, { foreignKey: 'post_id' });
// };
// db.post_images.belongsTo(db.post, {
//   foreignKey: "post_id",
//   as: "post_image",
// });

module.exports = db;
