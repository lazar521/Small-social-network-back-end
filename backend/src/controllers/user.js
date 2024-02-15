const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const Users = require("../models/user");
const { Sequelize } = require("sequelize");

require("dotenv").config();
const {JWT_KEY} = process.env;

const {RequestError,errorHandler} = require("../util/request-error");




exports.signUp = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    
    // Checks if all fields are present in the request body
    if( !(username && password && email) ){
        return res.status(400).json({message:"Some fields are empty"});
    }

    // Checks email regex
    if( !emailValidator.validate(email) ){
        return res.status(400).json({message:"Invalid email address"});
    }

    // We don't allow users to have the same username or email
    Users.findOne({
        where: {
            [Sequelize.Op.or]: 
            [{username},{email}]
        }
        
    }).then( user => {
        // If the email or username alredy exists in our database, we need to report that
        if(user != null){
             throw new RequestError(user.username === username ? "Username already exists" : "Email already exists",409); 
        }
        // Hash the password 
        return bcrypt.hash(password,10); 

    }).then(hashedPassword => {
        return Users.create({username, email ,password:hashedPassword});

    }).then( () => {
        return res.status(201).json({});

    }).catch(err => {
        errorHandler(err,res)
    })
} 


exports.login = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    // Checks if all fields are present in the request body
    if( !(username && password) ){
        return res.status(400).json({message:"Some fields are empty"});
    }

    let id;
    Users.findOne({
        where:{username}
   
    }).then(user =>{
        // If the user isn't signed up
        if(user == null) {
            throw new RequestError("Authentication failed",401);
        }
        
        id = user.id;
        // Compare the passwords
        return bcrypt.compare(password,user.password);
    
    }).then( isValid => {
        if( !isValid ) {
            throw new RequestError("Authentication failed",401);
        }
        // Sign the session token
        return jwt.sign({username,id},JWT_KEY,{expiresIn: "1h"});
         
    }).then( token => {
        return res.status(200).json({
            token: token,
        });

    }).catch(err => {
        errorHandler(err,res);
    });
}