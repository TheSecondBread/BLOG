const jwt = require("jsonwebtoken")

require('dotenv').config({path:"../.env"})
const secret  = process.env.SECRET


async function checkToken(req,res,next){
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.json({"msg":"login"})
    }
    else{
    const token =authHeader.split(" ")[1]
        jwt.verify(token,secret,(err,user)=>{
            req.user = user
        })
        
    }
    next()
}

module.exports = checkToken