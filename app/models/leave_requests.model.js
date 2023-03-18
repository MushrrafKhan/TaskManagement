module.exports = (sequelize, DataTypes) => {
    const leaverequest = sequelize.define("leave_request", {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      request_reason: {
        type: DataTypes.STRING
      },
      day_type: {
        type: DataTypes.ENUM,
        values: ['half_day', 'full_day']
      },
      emp_id: {
        type: DataTypes.STRING
      },
      
      hr_remark: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.DATE,
      },
      end_date: {
        type: DataTypes.DATE
      },
      leave_message: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.ENUM,
        values:['requested', 'accepted', 'decline']
      },
      hr_id: {
        type: DataTypes.INTEGER
      },
      leave_type_id	: {
        type: DataTypes.INTEGER
      },
    },{
        tableName: 'leave_request'
      }
      );
  
    return leaverequest;
  };
  