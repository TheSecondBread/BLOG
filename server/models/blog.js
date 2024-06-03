const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    des:{
        type:String,
        required:true
    },
    markdown:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    user:{
        type:String
    }

})

const BLOG = mongoose.model("blogs",blogSchema)


module.exports = BLOG