var base62 = require("base62/lib/ascii");
const ShortUrl = require("../models/ShortUrl")
const Counter = require("../models/Counter")
const { randomInt } = require('crypto');
require("dotenv").config()

let URL = process.env.SHORT_URL



const UniqueShortCode = async(req,res)=>{
    
    try{
        
        const url  = req.body.longUrl
        
        if(!url){
                return res.status(404).json({
                success:false,
                message:"The Orignal URL is Not Found "
            })
        }
        

        const URLInfo = await ShortUrl.findOne({originalUrl:url})
        
        console.log(`The url info is ${URLInfo}`)

        if(URLInfo!==null){
            
            return res.status(409).json({
            success:false,
            message:"The URL is already their in DB"
            })

        }

        BASE62_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
         
        let shortcode = ""
        let i = 0;
        while(i<7){
            const num = randomInt(0,64);
            shortcode+=BASE62_ALPHABET[num]
            i++;
        }
         

                
        console.log(shortcode)
        
        let URl = URL +`/${shortcode}`
        
        await ShortUrl.create({originalUrl:url ,ShortURL:URl, shortCode:shortcode});
        
        
        return res.status(200).json({
            success:true,
            code:shortcode,
            shortURL: URl,
            message:"Successfully created the unique code"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



module.exports = {UniqueShortCode}




