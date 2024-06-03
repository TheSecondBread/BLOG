const express = require("express")
const userRouter = express.Router()
const {handleUserSignup,handleUserSignin} = require("../controller/userController.js")

userRouter.post("/signup",handleUserSignup)


userRouter.post("/signin",handleUserSignin)



module.exports  = userRouter