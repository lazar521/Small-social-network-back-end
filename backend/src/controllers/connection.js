const Users = require("../models/user");
const Connections = require("../models/connection");
const sequelize = require("../server/db");

exports.addConnection = (decodedToken,req,res,next) => {
    const userId = decodedToken.id;
    const friendName = req.body.friendName;

    if(!friendName){
        return res.status(400).json({message:"Some fields are empty"});
    }

    Users.findOne({
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
    const userId = decodedToken.id;
    const friendName = req.body.friendName;

    if(!friendName){
        return res.status(400).json({message:"No friend name"});
    }

    Users.findOne({
        where:{
            username:friendName
        }
        
    }).then(friend => {
        if(friend == null){
            throw new Error("That user doesn't exist");
        }
        
        if(friend.id === userId){
            throw new Error("You cannot remove yourself");
        }

        return Connections.findOne({
            where:{userId, friendId:friend.id}
        });

    }).then( connection =>{
        if(connection == null){
            throw new Error("You were not following that user")
        }
        
        return Connections.destroy({
            where:{
                userId: connection.userId,
                friendId: connection.friendId
            }
        });

    }).then( () => {
        return res.status(200).json({});

    }).catch(err => {
        return res.status(400).json({message: err.message});
    });
}


exports.listConnections = (decodedToken,req,res,next) => {
    const userId = decodedToken.id;

    Users.findByPk(userId, {
        include: [{ model: Users, as: 'Friends', attributes: ["username"] }],
        attributes: []

    }).then( friendList => {
        friendNames = friendList.Friends.map( friend => friend.username);
        return res.status(200).json({friends:friendNames});
    
    }).catch(err => {
        return res.status(400).json({message: err.message});
    });
}
