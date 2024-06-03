const COMMENT = require("../models/comments")

async function handlePostComment(req,res){
    const comment = await COMMENT.create({
        body:req.body.body,
        user:req.user.user.name,
        blogId:req.body.blogID,
    })
    res.json(comment)
}  

async function handleGetComments(req,res){
    const blogId = req.params.blogId
    const comments = await COMMENT.find({blogId:blogId})
    res.json(comments)
}

module.exports = {handlePostComment ,handleGetComments}