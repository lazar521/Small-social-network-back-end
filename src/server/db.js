require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

const { DATABASE_NAME } = process.env;


db = new sqlite3.Database(DATABASE_NAME, (err) => {
    if (!err) console.log("Successfully connected to the SQLite database");
    else console.log("Error while opening the database: " + err.message); 
});
    

module.exports = db;