var validator = require('validator');


const validation = async(req,res,next)=>{
    try{

        const url = req.body.longUrl
        console.log(url)
        if(!url){
                return res.status(400).json({
                success:false,
                message:"The URL is Not Found "
            })
        }

        const isValidURL  = validator.isURL(url,{
            protocols: ['http', 'https'],
            require_protocol: true,       // Enforced because we sanitized it first
            require_valid_protocol: true,
            // allow_underscores: true
        })
        
        if(!isValidURL){
            return res.status(400).json({
                message:"Invalid or unsafe URL provided Or it is broken" 
            })
        }
        
        console.log("Passing to next")
        next()
    
    }
    catch(error){
           console.log(error)
           return res.status(500).json({
             message:"Internal server Error"
           })
    }
}


module.exports = {validation}