const express = require("express");
const cors = require("cors");
const router = require("./routes");


const app = express();


app.use(cors());
app.use(express.json());

// If there's a syntax error in the request JSON, we ignore the message and report the error to the client
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({message: "Bad JSON syntax"});
    }
    next(err);
});

// We accept all URLs that start with '/api'
app.use("/api",router);


// If the URL doesn't start with the '/api' we report that
app.use((req,res,next) =>{
    return res.status(404).json({
        message: "Invalid URL"
    });
})

// Catch any errors 
app.use( err =>{
    return res.status(500).json({
        message: "Internal server error"
    });
})

module.exports = app;