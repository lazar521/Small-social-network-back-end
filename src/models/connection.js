const { DataTypes } = require('sequelize');
const sequelize = require('../server/db'); 
const User = require("./user");

const Connection = sequelize.define("Connection", 
    {
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User, 
                key: 'id',
            }
        },
        friendId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id',
            }
        }
    },
        {
            timestamps: false 
        }
);

User.belongsToMany(User, { as: 'Friends', through: Connection, foreignKey: 'userId', otherKey: 'friendId' });

module.exports = Connection;