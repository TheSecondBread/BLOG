const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:false
    },
    profileImage:{
        type:String,
        required:true,
        unique:false
    }

})

const USER = mongoose.model("user",userSchema)


module.exports = USER