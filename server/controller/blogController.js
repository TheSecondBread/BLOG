const BLOG = require("../models/blog")

async function handlePostBlog(req,res){
    console.log("req recieved")
    const blog = await BLOG.create({
        title:req.body.title,
        des:req.body.des,
        markdown:req.body.markdown,
        createdBy:req.user.user._id,
        user:req.user.user.name,
    })
    res.json(blog)
}

async function handleGetAll(req,res){
    const blogs = await BLOG.find({})

    res.json(blogs)

}

async function handleGetById(req,res){
    const _id = req.params._id
    const blog = await BLOG.findOne({_id:_id})

    res.json(blog)
}
async function handleGetMyBlogs(req,res){
 
    const blog = await BLOG.find({createdBy:req.user.user._id})
    console.log(blog)
    res.json(blog)
}

async function handleBlogDelete(req,res){
    const blogid = req.params._id
    const blog = await BLOG.findOneAndDelete({_id:blogid})
    res.json({"msg":"deleted"})
}
async function handlegetuserBlogs(req,res){
    console.log("req")
    const user = req.params.user;
    const blogs = await BLOG.find({user:user})
    res.json(blogs)
}

async function handlePatchById(req,res){
        const _id = req.params._id;
        const { title, des , markdown } = req.body;
        const blog = await BLOG.findOneAndUpdate(
            { _id }, 
            { 
                title:title, 
                des:des, 
                markdown:markdown 
            },
            { 
                new: true, // Return the updated document
                runValidators: true // Ensure the updated data adheres to schema validation
            }
        );

        if (!blog) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        res.status(200).json(blog);

};
module.exports = {handleGetAll,handleGetById,handlePostBlog,handleGetMyBlogs,handleBlogDelete,handlegetuserBlogs,handlePatchById}
