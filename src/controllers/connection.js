const userModel = require("../models/user");
const Connections = require("../models/connection");
const sequelize = require("../server/db");

exports.addConnection = (decodedToken,req,res,next) => {
    const userId = decodedToken.id;
    const friendName = req.body.friendName;

    if(!friendName){
        return res.status(400).json({message:"Some fields are empty"});
    }

    userModel.findOne({
        where: {username:friendName}
    
    }).then(friend => {
        if(friend == null){
            throw new Error("That user doesn't exist");
        }
        
        if(friend.id === userId){
            throw new Error("You cannot follow yourself");
        }

        return Connections.findOrCreate({
            where: {userId, friendId:friend.id}
        });
    
    }).then(([newConnection,created]) => {
        if(created) msg = "You are now following " + friendName;
        else msg =  "You are alredy following " + friendName;
        
        return res.status(200).json({message:msg});
    
    }).catch(err => {
        return res.status(400).json({message: err.message});
    })

}



exports.removeConnection = (decodedToken,req,res,next) => {
    
}