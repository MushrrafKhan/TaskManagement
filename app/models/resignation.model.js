module.exports = (sequelize, DataTypes) => {
    const Resign = sequelize.define("resignation", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true
        },
        emp_id: {
            type:DataTypes.INTEGER,
        },
        reason: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM,
            values: ['accept', 'decline', 'pending']
        },
        reply_by:{
            type:DataTypes.INTEGER,
        }
    }, {
        tableName:'resignation'
    });
    return Resign;

};