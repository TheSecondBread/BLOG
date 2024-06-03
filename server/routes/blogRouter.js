const express = require("express")
const  {handleGetAll,handleGetById,handlePostBlog,handleGetMyBlogs,handleBlogDelete,handlegetuserBlogs,handlePatchById} = require("../controller/blogController")
const checkToken = require("../middlewares/auth")
const blogRouter = express.Router()

blogRouter.post("/post",checkToken,handlePostBlog)

blogRouter.get("/",handleGetAll)

blogRouter.get("/:_id", handleGetById)

blogRouter.patch("/:_id", handlePatchById)

blogRouter.delete("/:_id", handleBlogDelete)

blogRouter.get("/show/:user", handlegetuserBlogs)

blogRouter.post("/myblogs",checkToken,handleGetMyBlogs)

module.exports = blogRouter