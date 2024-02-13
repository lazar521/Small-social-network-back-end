const express = require("express");
const emailValidator = require("email-validator");
const mongoose = require("mongoose");
const User = require("./model");
const bcrypt = require("bcrypt");
 
const router = new express.Router();



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
        if(result == null) return bcrypt.hash(password,10);
        else throw new Error(result.username === username ? "Username already exists" : "Email already exists");

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
        if(user != null) return bcrypt.compare(password,user.password);
        throw new Error("Authentification failed");
        
    }).then( isValid => {
        if(isValid) return res.status(200).json({message:"Successfully logged in"});
        else throw new Error("Authentification failed");

    }).catch(err => {
        return res.status(400).json({message: err.message});
    })
})




module.exports = router;