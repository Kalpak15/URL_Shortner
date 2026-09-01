const mongoose  = require("mongoose")
const User = require("./User")


const shortUrlSchema = new mongoose.Schema({
      
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // default:" "
    },
    originalUrl:{
        type:String,
        required:true
    },
    ShortURL:{
        type:String,
        // required:true,
        // unique:true,
        // default:""
    },
    shortCode:{
        type: String,
        unique: true,
        // required: true,
        // index: true,
        // default:""
    },
    clickCount:{
       type:Number,
       default:0
    }

    


},{ timestamps: true })

module.exports = mongoose.model("ShortUrl",shortUrlSchema)

