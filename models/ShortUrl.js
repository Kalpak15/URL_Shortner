const mongoose  = require("mongoose")



const shortUrlSchema = new mongoose.Schema({
      
    userId:{
        type:"User",
        ref:mongoose.Types.Schema.ObjectId
    },
    originalUrl:{
        type:String,
        required:true
    },
    ShortURL:{
        type:String,
        required:true,
        default:""
    },
    shortCode:{
        type: String,
        required: true,
        unique: true,
        index: true,
        default:""
    }

    


},{ timestamps: true })

module.exports = mongoose.model("ShortUrl",shortUrlSchema)

