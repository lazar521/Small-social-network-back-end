const sequelize = require("sequelize");
const Posts = require("../models/post");
const Users = require("../models/user");

exports.publishPost = (decodedToken,req,res,next) => {
    const userId = decodedToken.id;
    const contents = req.body.contents;

    if(!contents){
        return res.status(400).json({message:"Some fields are empty"});
    }

    Posts.create({userId,contents}).then( () => {
        return res.status(200).json({message:"Post created"});
    
    }).catch(err => {
        return res.status(400).json({message: err.message});
    })
}


exports.getFeed = (decodedToken,req,res,next) => {
    const userId = decodedToken.id;

    Users.findByPk(userId, {
        include: [{ model: Users, as: 'Friends', attributes: ["id"] }],
        attributes: []

    }).then( userWithFriends => {
        friendIds = userWithFriends.Friends.map( friend => friend.id);

        return Posts.findAll({
            where: { userId: { [sequelize.Op.in]: friendIds } },
            attributes: ["contents","createdAt"],
            include: [{ model: Users, as: 'User', attributes: ["username"]  }],
            order: [['createdAt', 'DESC']] 
        });

    }).then( friendPosts => { 
        return res.status(200).json({Posts: friendPosts});

    }).catch(err => {
        return res.status(400).json({message: err.message}); 
    })
}