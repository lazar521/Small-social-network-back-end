const { DataTypes } = require('sequelize');
const sequelize = require('../server/db'); 


const User = sequelize.define('User', {
    username: {
      type: DataTypes.TEXT,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
});

module.exports = User;