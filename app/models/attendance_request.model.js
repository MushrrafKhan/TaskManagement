module.exports = (sequelize, DataTypes) => {
    const request =sequelize.define("attendance_request", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        attendance_id: {
            type: DataTypes.INTEGER,
        },
        emp_id: {
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.TIME,
        },
        start_time: {
            type: DataTypes.TIME,
        },
        end_time: {
            type: DataTypes.TIME,
        },
        status: {
            type: DataTypes.ENUM('accept', 'decline', 'pending'),
        },
        comment: {
            type: DataTypes.STRING,
        }
    },
    {
        tableName:'attendance_request'
    });
    return request;
};
