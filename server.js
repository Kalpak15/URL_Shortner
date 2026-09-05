const express = require('express')
const app = express()
var session = require('express-session')
require('dotenv').config()


const PORT =  process.env.PORT || 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));


const dbconnect = require("./config/database")
dbconnect()

// app.get("/api/v1/request",(req,res)=>{
//     res.status(200).json({
//         success:true,
//         message:"Request Running Properly"
//     })
// })

// Shortcode creation + Redirection
const shorturlRoute = require("./routes/shorturlRoute")
app.use("/api/shorturl",shorturlRoute)


// URL Info Fetching
const URLInfo = require("./routes/URLinfo")
app.use("/api/url",URLInfo)

// Login and Signup
const loginSignup = require("./routes/loginsignup")
app.use("/api/v1/",loginSignup)


// session

app.listen(PORT,()=>console.log("Server is running on port",PORT))
