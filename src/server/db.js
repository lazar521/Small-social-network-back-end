require("dotenv").config();
const {MONGODB_URI} = process.env;

const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(MONGODB_URI,{});
        console.log("\nSuccessfully connected to database");        
    }
    catch(err){
        console.log("\nDatabase connection failed: " + err.message);
    }
}

module.exports = connectDB;




