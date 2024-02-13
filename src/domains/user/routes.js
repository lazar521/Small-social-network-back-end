const express = require("express");
const emailValidator = require("email-validator");
const mongoose = require("mongoose");
const User = require("./model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const router = new express.Router();

require("dotenv").config();
const {JWT_KEY} = process.env;

// TODO: add another type of error
router.post("/signup",(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    
    if( !(username && password && email) ){
        return res.status(400).json({message:"Some fields are empty"});
    }

    if( !emailValidator.validate(email) ){
        return res.status(400).json({message:"Invalid email address"});
    }

    User.findOne({ $or: [{username:username}, {email:email}]  }).exec().then( result => {
        if(result != null) throw new Error(result.username === username ? "Username already exists" : "Email already exists"); 
        return bcrypt.hash(password,10); 

    }).then(hashedPassword => {
        const user = new User({
            _id : new mongoose.Types.ObjectId(),
            username: username,
            password: hashedPassword,
            email: email
        });
        return user.save();

    }).then( () => {
        return res.status(200).json({message:"Successfully signed up"});

    }).catch(err => {
        return res.status(400).json({message: err.message});
    })
});



// TODO: add another type of error
router.post("/login",(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;

    if( !(username && password) ){
        return res.status(400).json({message:"Some fields are empty"});
    }


    User.findOne({username:username}).exec().then(user =>{
        if(user == null) throw new Error("Authentication failed");
        return bcrypt.compare(password,user.password).then( isValid => ({user,isValid}));
    
    }).then( result => {
        const {user,isValid} = result;

        if( !isValid ) throw new Error("Authentication failed");
        
        return new Promise((resolve,reject) => {
            jwt.sign({id:user._id},JWT_KEY,{expiresIn: "1h"}, (err,token) =>{
                if(err) reject(err);
                else resolve(token);
            });
        });
         
    }).then(jwtToken =>{
        return res.status(200).json({
            message:"Successfully logged in",
            token: jwtToken
        });

    }).catch(err => {
        return res.status(400).json({message: err.message});
    })
})


module.exports = router;