const express = require('express')

const router = express.Router();

const {getAllUrlInfo,getUrlInfo} = require("../controllers/getUrlInfoController")

router.get("/info",getAllUrlInfo);
router.get("/info/:shortcode",getUrlInfo);

module.exports = router