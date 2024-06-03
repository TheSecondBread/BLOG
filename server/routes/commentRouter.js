const express = require("express");
const {handlePostComment ,handleGetComments} = require("../controller/commentController")
const checkToken = require("../middlewares/auth")

const commentRouter = express.Router();

commentRouter.post("/post",checkToken ,handlePostComment)

commentRouter.get("/:blogId",handleGetComments)


module.exports = commentRouter