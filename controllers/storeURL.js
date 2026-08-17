const expres = require("express")
const shortUrl = require("../models/ShortUrl")
const Counter = require("../models/Counter")

const storeurlInfo = async(req,res)=>{
    
    try{
        
        const URL = req.body.longUrl
        
        if(!URL){
            return res.status(401).json({
               message:"URL is missing"
            })
        }

        const storeInfo = await shortUrl.create({originalUrl:URL})

        console.log(storeInfo)

        const storeCounterInfo = await Counter.create({LongUrlid:storeInfo._id})
        console.log(storeCounterInfo)

        return res.status(200).json({
            succcess:true,
            message:"sucessfully store in the DB"
        })

    }
    catch(erorr){
        return res.status(500).json({
            success:"false",
            message:"Not able to store the url in the DB"
        })
    }

} 

module.exports = {storeurlInfo}