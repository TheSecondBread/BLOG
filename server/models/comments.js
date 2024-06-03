const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
{
    body:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    },
    blogId:{
        type:String,
        required:true
    },
}
)

const COMMENT = mongoose.model("comments",commentSchema)

module.exports = COMMENT