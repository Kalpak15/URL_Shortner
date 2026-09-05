const express = require('express');
const {google} = require('googleapis');
const crypto = require('crypto');
const session = require('express-session');
require('dotenv').config()


const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);


const scopes = [
  'openid', 
  'email', 
  'profile'
];


const googleLoginSignUp = async(req,res)=>{   

      // Generate a secure random state value.
      const state = crypto.randomBytes(32).toString('hex');
      
      // Store state in the session
      req.session.state = state;
      
      console.log("State stored in session:", req.session.state);
      // Generate a url that asks permissions for the Drive activity and Google Calendar scope
      const authorizationUrl = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        /** Pass in the scopes array defined above.
        * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: scopes,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true,
      // Include the state parameter to reduce the risk of CSRF attacks.
      state: state
    });
    
    console.log("Authorization URL:", authorizationUrl);
    res.redirect(authorizationUrl);

}

module.exports = {googleLoginSignUp}

// OAuth 2.0 = permission
// OpenID Connect = identity/login




