const express = require('express')
require("dotenv").config()

const router = express.Router();

const {googleLoginSignUp} = require("../controllers/googleSignUpController")
const {callBackController} = require("../controllers/callbackController")
const {authMiddleware} = require("../middleware/auth")


router.get("/auth/google",googleLoginSignUp);
router.get("/auth/logout",(req,res)=>{
       return res
       .clearCookie("auth_token" ,{httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', path: '/' })
       .json({
        success:true,
        message:"User Logged Out Successfully"
       })
});
router.get("/callback",callBackController);


module.exports = router