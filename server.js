const express = require('express')
const app = express()
require('dotenv').config()


const PORT =  process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());


const dbconnect = require("./config/database")
dbconnect()

app.get("/api/v1/request",(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Request Running Properly"
    })
})

const shorturlRoute = require("./routes/shorturlRoute")
app.use("/api/shorturl",shorturlRoute)
app.use("/api/store",shorturlRoute)




app.listen(PORT,()=>console.log("Server is running on port",PORT))



