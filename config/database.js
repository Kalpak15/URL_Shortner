const mongoose = require("mongoose")
require("dotenv").config()
const dbConnnect  = async()=>{
        
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Database connected successfully")
    })
    .catch((error)=>{
        console.log("Error while connecting to database",error)
        process.exit(1)
    })

}

module.exports = dbConnnect