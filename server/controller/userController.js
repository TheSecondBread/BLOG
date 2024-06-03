const USER = require("../models/user") 
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
require('dotenv').config({path:"../.env"})

const secret  = process.env.SECRET


async function handleUserSignup(req,res){
    const hashedPassword = await bcrypt.hash(req.body.password,10)

    const user = await USER.create({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword,
        profileImage:"default"
    })
    res.json({"msg":"new user created"})
    
}


async function handleUserSignin(req,res){
    const user = await USER.findOne({email:req.body.email})
    console.log("req",req.body)

    if(!user){
        res.json({"msg":"invalid username"})
    }
    else{
        console.log(user)

        if(await bcrypt.compare(req.body.password , user.password)){
            const token = await jwt.sign({user},secret)
            res.json({token})
        }
        else{
            res.json({"msg":"invalid password"})
        }

        
    }
}
module.exports ={handleUserSignup,handleUserSignin}