require("dotenv").config();
const {MONGODB_URI} = process.env;

const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(MONGODB_URI,{});
        console.log("Successfully connected to database");        
    }
    catch(err){
        console.log("Database connection failed: " + err.message);
    }
}

module.exports = connectDB;




