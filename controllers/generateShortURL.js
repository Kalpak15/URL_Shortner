// var base62 = require("base62/lib/ascii");
const ShortUrl = require("../models/ShortUrl")

const { randomInt } = require('crypto');
require("dotenv").config()

let URL = process.env.SHORT_URL



const UniqueShortCode = async(req,res)=>{
    
    try{
        
        const url  = req.body.longUrl
        
        const URLInfo = await ShortUrl.findOne({originalUrl:url})
        
        // console.log(`The url info is ${URLInfo}`)

        if(URLInfo!==null){
            
            return res.status(409).json({
            success:false,
            message:"The URL is already their in DB"
            })
            
        }
        
        BASE62_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        function func(){
            
            let shortcode = "";
            let i = 0;
            while(i<7){
                const num = randomInt(0,62);
                shortcode+=BASE62_ALPHABET[num]
                i++;
            }
            return shortcode;
        }
    
        
        
        let code;
        let shortURL;

        while (true) {

            code = func();

            shortURL = `${URL}/${code}`;

            try {

                await ShortUrl.create({
                    originalUrl: url,
                    ShortURL: shortURL,
                    shortCode: code
                });

                // Successfully created
                break;

            } catch (error) {

                // Duplicate shortCode
                if (error.code === 11000) {

                    console.log(
                        `Collision detected for ${code}. Generating a new code...`
                    );

                    continue;
                }

                // Any other database error
                throw error;
            }
        }


        
        
        return res.status(200).json({
            success:true,
            code:code,
            shortURL: shortURL,
            message:"Successfully created the unique code"
        })

    }
    catch(error){
        console.log(error)

        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}



module.exports = {UniqueShortCode}




