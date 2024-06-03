const express = require("express")
const connectMongo = require("./connection")
const userRouter = require("./routes/userRouter")
const blogRouter = require("./routes/blogRouter")
const commentRouter = require("./routes/commentRouter")
require('dotenv').config()
const cors = require("cors")
const app = express()
//MongoDB

connectMongo(process.env.MONGO_URI)
.then(console.log("mongo connected"))


//middlewares
app.use(express.json())
app.use(cors())

//routes

//user
app.use("/user",userRouter)

//blogs
app.use("/blogs",blogRouter)

//comments
app.use("/comment",commentRouter)




//port
app.listen(8000,()=>console.log("server started"))
