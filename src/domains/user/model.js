const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    username: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    email: {type:String,required:true, unique:true}
});


module.exports = mongoose.model("User",userSchema);