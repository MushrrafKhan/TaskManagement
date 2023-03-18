module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_name: {
        type: DataTypes.STRING
      },
      auth_key: {
        type: DataTypes.STRING
      },
      password: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.STRING,
        values: ['active', 'inactive'],
      },
      role: {
        type: DataTypes.STRING,
        values: ['admin','manager','subadmin','emp','client','hr'],
      },
      token: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      otp:{
        type: DataTypes.STRING
      }
    },{
        tableName: 'user'
      }
      );
  
    return User;
  };
  