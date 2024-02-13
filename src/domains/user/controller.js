const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 

const db = require("./model");

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

    db.findUsernameOrEmail(username,email).then( users => {
        if(users.length !== 0) throw new Error(users[0].username === username ? "Username already exists" : "Email already exists"); 
        return bcrypt.hash(password,10); 

    }).then(hashedPassword => {
        return db.insertUser(username,email,hashedPassword);

    }).then( () => {
        return res.status(200).json({message:"Successfully signed up"});

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

   db.findUser(username).then(users =>{
        if(users.length === 0) throw new Error("Authentication failed");
        return bcrypt.compare(password,users[0].password).then( isValid => ({users ,isValid}) );
    
    }).then( result => {
        const {users,isValid} = result;

        if( !isValid ) throw new Error("Authentication failed");
        
        return new Promise((resolve,reject) => {
            jwt.sign({id:users[0].id},JWT_KEY,{expiresIn: "1h"}, (err,token) =>{
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
}