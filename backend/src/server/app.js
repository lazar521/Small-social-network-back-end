const express = require("express");
const cors = require("cors");


const app = express();


app.use(cors());
app.use(express.json());


app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({message: "Bad JSON syntax"});
    }
    next(err);
});


const router = require("./routes");
app.use("/api",router);


app.use((req,res,next) =>{
    return res.status(404).json({
        message: "Bad request. Route doesn't exist"
    });
})

app.use((err) =>{
    return res.status(500).json({
        message: "Internal server error"
    });
})

module.exports = app;