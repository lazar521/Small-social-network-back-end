require("dotenv").config();
require("./db");


const {PORT} = process.env; 

const app = require("./app");


app.listen(PORT, () =>{
    console.log("\nServer started at port " + PORT );
})


