const sequelize = require("sequelize");
const Posts = require("../models/post");
const Users = require("../models/user");
const {RequestError,errorHandler} = require("../util/request-error");


exports.publishPost = (decodedToken,req,res,next) => {
    const userId = decodedToken.id;
    const contents = req.body.contents;

    // Checks if all fields are present in the request body
    if(!contents){
        return res.status(400).json({message:"Some fields are empty"});
    }

    Posts.create({userId,contents}).then( () => {
        return res.status(200).json({});
    
    }).catch(err => {
        errorHandler(err,res);
    })
}


exports.getFeed = (decodedToken,req,res,next) => {
    const userId = decodedToken.id;

    // Fetch all user IDs that the 'userId' is connected to  (is friends with) 
    Users.findByPk(userId, {
        include: [{ model: Users, as: 'Friends', attributes: ["id"] }],
        attributes: []

    }).then( userWithFriends => {
        // Extract the friends' IDs from the json
        friendIds = userWithFriends.Friends.map( friend => friend.id);

        // Find all posts that are made by friends
        return Posts.findAll({
            where: { userId: { [sequelize.Op.in]: friendIds } },
            attributes: ["contents","createdAt"],
            include: [{ model: Users, as: 'User', attributes: ["username"]  }],
            order: [['createdAt', 'DESC']] 
        });

    }).then( friendPosts => { 
        return res.status(200).json({Posts: friendPosts});

    }).catch(err => {
        errorHandler(err,res);
    })
}