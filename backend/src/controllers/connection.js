const Users = require("../models/user");
const Connections = require("../models/connection");
const {RequestError,errorHandler} = require("../util/request-error");

exports.addConnection = (decodedToken,req,res,next) => {
    const userId = decodedToken.id;
    const friendName = req.body.friendName;

    // Checks if all fields are present in the request body
    if(!friendName){
        return res.status(400).json({message:"Some fields are empty"});
    }

    // Find the user associated with the username given
    Users.findOne({
        where: {username:friendName}
    
    }).then(friend => {
        if(friend == null){
            throw new RequestError("That user doesn't exist",404);
        }
        
        // If the user is trying to add himself as a friend
        if(friend.id === userId){
            throw new RequestError("Cannot follow yourself",409);
        }

        return Connections.findOrCreate({
            where: {userId, friendId:friend.id}
        });
    
    }).then(([newConnection,created]) => {
        if(!created) throw new RequestError("You are alredy following " + friendName,409);
        
        return res.status(200).json({});
    
    }).catch(err => {
        errorHandler(err,res);
    });

}



exports.removeConnection = (decodedToken,req,res,next) => {
    const userId = decodedToken.id;
    const friendName = req.body.friendName;

    // Checks if all fields are present in the request body
    if(!friendName){
        return res.status(400).json({message:"No friend name"});
    }

    // Find user associated with the given name
    Users.findOne({
        where:{
            username:friendName
        }
        
    }).then(friend => {
        if(friend == null){
            throw new RequestError("That user doesn't exist",404);
        }
        
        // If a user is trying to remove himself from the friend list
        if(friend.id === userId){
            throw new RequestError("You cannot remove yourself",409);
        }

        return Connections.findOne({
            where:{userId, friendId:friend.id}
        });

    }).then( connection =>{
        if(connection == null){
            throw new RequestError("You were not following that user",409)
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

    // Find all friends' usernames
    Users.findByPk(userId, {
        include: [{ model: Users, as: 'Friends', attributes: ["username"] }],
        attributes: []

    }).then( friendList => {
        // extract the usernames from the json
        friendNames = friendList.Friends.map( friend => friend.username);
        
        return res.status(200).json({friends:friendNames});
    
    }).catch(err => {
        errorHandler(err,res)
    });
}
