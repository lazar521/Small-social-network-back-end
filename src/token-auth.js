require("dotenv").config();

const jwt = require("jsonwebtoken");


const {JWT_KEY} = process.env;


module.exports = (req,res,next) => {
    try{
        const decoded = jwt.verify(req.headers.autorization, JWT_KEY);
        req.userData = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({message: "You are not logged in"})
    }
}