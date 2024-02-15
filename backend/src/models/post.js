const { DataTypes } = require('sequelize');
const sequelize = require('../server/db'); 
const User = require("./user");

const Post = sequelize.define("Post",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', 
                key: 'id',
            },
        },
        contents:{
            type: DataTypes.TEXT,
            allowNull: false
        }
    }
);


User.hasMany(Post,{foreignKey:"userId"});
Post.belongsTo(User,{foreignKey:"userId"});

module.exports = Post;