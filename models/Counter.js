const shortUrlSchema = require("./ShortUrl")
const mongoose = require("mongoose")

const counterSchema = new mongoose.Schema({
       
    LongUrlid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"shortUrlSchema"
    },
    sequence:{
        type:Number,
        default:0
    }

})

module.exports = mongoose.model("Counter",counterSchema)



