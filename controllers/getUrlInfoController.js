const shortURL = require("../models/ShortUrl")

// for all documents
const getAllUrlInfo = async(req,res)=>{
     
    try{
    
        const info = await shortURL.find()
        console.log(info)
        if(info.length>0){
            return res.status(200).json({
                success:true,
                data:info,
                message:"All url's info"
            })
        }
  
        
        return res.status(404).json({
            message:"Not a single document found"
        })
        

    }
    catch(error){
        
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

}


// fetch for single document
const getUrlInfo = async(req,res)=>{
     
    try{
        
        const {shortcode}  = req.params
        
        const info = await shortURL.findOne({shortCode:shortcode})
        
        if(info===null){
            return res.status(404).json({
                success:false,
                message:"The url info for given shortcode is not present"
            })
        }
        
        
        return res.status(200).json({
            success:true,
            data:info,
            message:"The url for shortcode is found"
        })


    }
    catch(error){
        
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

} 

module.exports = {getAllUrlInfo,getUrlInfo}