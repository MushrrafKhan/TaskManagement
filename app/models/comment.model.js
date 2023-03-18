module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("comment", {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: DataTypes.TEXT
      },
      image: {
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      task_id: {
        type: DataTypes.INTEGER
      },
    },{
        tableName: 'comment'
      }
      );
  
    return Comment;
  };
  