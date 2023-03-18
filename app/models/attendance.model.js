module.exports = (sequelize, DataTypes) => {
    const Attendance = sequelize.define("attendance", {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      emp_id: {
        type: DataTypes.INTEGER
      },
      attendance_date: {
        type: DataTypes.DATE
      },
      attendance_type_id: {
        type: DataTypes.INTEGER
      },
      attendance_source_id: {
        type: DataTypes.INTEGER
      },
      login_time: {
        type: DataTypes.TIME
      },
      logout_time: {
        type: DataTypes.TIME
      }
      
    },{
      tableName: 'attendance'
      }
      );
    return Attendance;
  };