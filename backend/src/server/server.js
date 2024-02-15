require("dotenv").config();
require("./db");

const {PORT} = process.env; 

const app = require("./app");


app.listen(PORT || 3000, () =>{
    console.log("\nServer started at port " + (PORT || 3000) );
})


