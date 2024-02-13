require("dotenv").config();

const {PORT} = process.env; 

const app = require("./app");
const connectDB = require("./db");


app.listen(PORT || 3000, () =>{
    console.log("\nServer started at port " + (PORT || 3000) );
})

connectDB();

