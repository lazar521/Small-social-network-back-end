const { DataTypes } = require('sequelize');
const sequelize = require('../server/db'); 


const User = sequelize.define('User', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
        type: DataTypes.TEXT,
        primaryKey: false,
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
  }, 
    {
      timestamps: false // This suppresses the automatic creation of `createdAt` and `updatedAt`
    }
);

module.exports = User;