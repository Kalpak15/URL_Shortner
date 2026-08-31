const ShortUrl = require("../models/ShortUrl")

const RedirectUrl = async(req,res)=>{
     
    try{
        
        let shortcode = req.params.url;
        console.log(shortcode)

        let fullInfo  = await ShortUrl.findOne({shortCode:shortcode})
        
        console.log(fullInfo)

        if(fullInfo==null){
            return res.status(404).json({
                success:false,
                message:"The Shortcode is not found"
            })
        }
        
        return res.status(200).json({
            success:true,
            data:fullInfo,
            message:"The shortcode info is fetched sucessfully"
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


module.exports = {RedirectUrl}

