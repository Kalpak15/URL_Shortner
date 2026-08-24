// const express = require("express")
const shortUrl = require("../models/ShortUrl")
// const Counter = require("../models/Counter")

const storeurlInfo = async(req,res)=>{
    
    try{
        
        const URL = req.body.longUrl
        
        if(!URL){
            return res.status(401).json({
               message:"URL is missing"
            })
        }
        
        const already = await shortUrl.findOne({originalUrl:URL})
        
        console.log(already)

        if(already){
            return res.status(409).json({
               message:"URL is aready found in the Database"
            }) 
        }

        const storeInfo = await shortUrl.create({originalUrl:URL})

        console.log(storeInfo)

        // const storeCounterInfo = await Counter.create({LongUrlid:storeInfo._id})
        // console.log(storeCounterInfo)

        return res.status(200).json({
            succcess:true,
            message:"sucessfully store Orignal URL in the DB"
        })

    }
    catch(error){
        console.log(error)

        return res.status(500).json({
            success:"false",
            message:"Not able to store Orignal URL in the DB"
        })
    }

} 

module.exports = {storeurlInfo}