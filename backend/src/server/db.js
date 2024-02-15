require("dotenv").config();
const { Sequelize } = require('sequelize');

const { DATABASE_NAME } = process.env;

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: DATABASE_NAME,
  logging: false
});


module.exports = sequelize;

// Import models to ensure they are registered
require("../models/user"); 
require("../models/connection");
require("../models/post");

(async () => {
    await sequelize.sync();
    console.log("Database synchronized");
})();

