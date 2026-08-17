var base62 = require("base62/lib/ascii");
const ShortUrl = require("../models/ShortUrl")
const Counter = require("../models/Counter")

const UniqueShortCode = async(req,res)=>{
    
    try{
        
        const url  = req.body.longUrl

        const URLInfo = await ShortUrl.findOne({originalUrl:url})
        
        console.log(URLInfo)
        
        const id = URLInfo._id

        const counterInfo = await Counter.findOne({LongUrlid:id})
        
        console.log(counterInfo)

        let no = counterInfo.sequence
        no++
        const shortcode  = base62.encode(no);
        
        console.log(shortcode)

        await Counter.findByIdAndUpdate(
                          {_id:counterInfo._id},
                          {
                            $set:{
                                sequence:no
                            }
                          }
                        )
        
        res.status(200).json({
            success:true,
            message:"Successfully created the unique code"
        })

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}



module.exports = {UniqueShortCode}




