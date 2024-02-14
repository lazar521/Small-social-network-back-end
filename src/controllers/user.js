const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const userModel = require("../models/user");
const { Sequelize } = require("sequelize");

require("dotenv").config();
const {JWT_KEY} = process.env;


exports.signUp = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    
    if( !(username && password && email) ){
        return res.status(400).json({message:"Some fields are empty"});
    }

    if( !emailValidator.validate(email) ){
        return res.status(400).json({message:"Invalid email address"});
    }

    userModel.findOne({
        where: {
            [Sequelize.Op.or]: 
            [{username},{email}]
        }
    }).then( user => {
        if(user != null){
             throw new Error(user.username === username ? "Username already exists" : "Email already exists"); 
        }
        return bcrypt.hash(password,10); 

    }).then(hashedPassword => {
        return userModel.create({username, email ,password:hashedPassword});

    }).then( () => {
        return res.status(201).json({message:"Successfully signed up"});

    }).catch(err => {
        return res.status(400).json({message: err.message});
    })
} 


exports.login = (req,res,next) => {
    const username = req.body.username;
    const password = req.body.password;

    if( !(username && password) ){
        return res.status(400).json({message:"Some fields are empty"});
    }

    userModel.findByPk(username).then(user =>{
        if(user == null) throw new Error("Authentication failed");
        return bcrypt.compare(password,user.password);
    
    }).then( isValid => {
        if( !isValid ) throw new Error("Authentication failed");
        
        return new Promise((resolve,reject) => {
            jwt.sign({username},JWT_KEY,{expiresIn: "1h"}, (err,token) =>{
                if(err) reject(err);
                else resolve(token);
            });
        });
         
    }).then( token => {
        return res.status(200).json({
            message:"Successfully logged in",
            token: token,
            username: username
        });

    }).catch(err => {
        return res.status(400).json({message: err.message});
    })
}