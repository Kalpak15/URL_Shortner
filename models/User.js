const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true,
        match: [/^\+[1-9]\d{6,14}$/, 'Please fill a valid international phone number']
    }


})

module.exports = mongoose.model("User",userSchema)
