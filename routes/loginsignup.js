const express = require('express')

const router = express.Router();

const {googleLoginSignUp} = require("../controllers/googleSignUpController")

router.get("/auth/google",googleLoginSignUp);


module.exports = router