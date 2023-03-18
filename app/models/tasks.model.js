module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("task", {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      description: {
        type: DataTypes.TEXT
      },
      title: {
        type: DataTypes.STRING
      },
      project_id: {
        type: DataTypes.INTEGER
      },
      assign_to: {
        type: DataTypes.INTEGER
      },
      status: {
        type: DataTypes.STRING,
        values: ['pending','progress','hold','close','reopen'],
      },
      image: {
        type: DataTypes.STRING
      },
      doc: {
        type: DataTypes.STRING
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      start_date: {
        type: DataTypes.DATE
      },
      due_date: {
        type: DataTypes.DATE
      },
      close_date: {
        type: DataTypes.DATE
      },
      created_by: {
        type: DataTypes.INTEGER
      },
    },{
      tableName:'task'
    });
  
    return Comment;
  };
  