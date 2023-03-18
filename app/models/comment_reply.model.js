module.exports = (sequelize, DataTypes) => {
    const comment_reply = sequelize.define("comment_reply", {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment_id: {
      type: DataTypes.INTEGER
    },
    reply_by: {
      type: DataTypes.INTEGER
    },
    reply: {
    type: DataTypes.TEXT
    }
    },{
      tableName:'comment_reply'
    });
  
    return comment_reply;
  };
  