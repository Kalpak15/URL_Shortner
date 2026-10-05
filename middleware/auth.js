
const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleware = async(req,res,next)=>{
      
    try{

        const token  = req.cookies.auth_token
        
        console.log(req.cookies)

        if(token==undefined){
            return res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
        }
        
       
        try{
            const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
            req.userid = decodedToken.userid
            console.log("Decoded Token:", decodedToken);
        }
        catch(error){
             return res.status(401).json({
                success:false,
                message:"Invalid token"
            })
        }
    
        next()

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}


module.exports = {authMiddleware}