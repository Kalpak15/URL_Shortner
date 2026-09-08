const {OAuth2Client} = require('google-auth-library');
const {google} = require('googleapis');
const User = require("../models/User")
const jwt = require("jsonwebtoken");
require("dotenv").config(); 

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const callBackController = async(req,res) =>{
    try{
        const {state ,code,error} = req.query
        const storedState = req.session.state;

        if(req.error){
            console.log(req.error)
            return res.status(400).json({
                success:false,
                message:req.error
            })
        }

        console.log("state is :",state)
        console.log("code is :",code)
        
        if(!state || !code || !storedState){
            return res.status(400).json({
                success:false,
                message:"Missing required parameters or session state"
            })
        }

        if(state!==storedState){
            return res.status(400).json({
                success:false,
                message:"Invalid state parameter"
            })
        }

        let { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        console.log("Tokens received:", tokens);
         


        const client = new OAuth2Client();
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: process.env.GOOGLE_CLIENT_ID,  
        });

        console.log("Ticket:", ticket);
        
        const payload = ticket.getPayload();
        
        console.log("payload:", payload);
        
        const userid = payload['sub'];
        console.log(userid)
        
        

        const {email,name,picture} = payload
        
        const UserInfo = await User.findOne({googleId:userid})
        
        let jsontoken;
        secretKey = process.env.JWT_SECRET
        options = {
            expiresIn: '1h'
        }

        if(UserInfo!==null){
            let payload = {
               userid:UserInfo._id,
               email:UserInfo.email,
               name:UserInfo.name,
            }

            jsontoken = jwt.sign(payload, secretKey, options)

            return res.status(200).json({
                success:true,
                data:UserInfo,
                token:jsontoken
            })
        }
        
        else{
            try{
                const newUser = await User.create({
                    googleId: userid,
                    email:email,
                    name:name,
                    profilePicture:picture 
                })
                
                console.log("New user created:", newUser);

                return res.status(200).json({
                    success:true,
                    data:newUser,
                    message:"User is created successfully",
                    token:jsontoken
                })
            }
            catch(error){
                console.error("Error creating user:", error);
                return res.status(500).json({
                    success:false,
                    message:"Error creating user"
                })
            }
        }
    }
        

    catch(error){
        console.error("Error in callback controller:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {callBackController}
