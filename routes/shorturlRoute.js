const express = require('express')

const router = express.Router();

const {UniqueShortCode} = require("../controllers/generateShortURL")
const {RedirectUrl} = require("../controllers/redirectController")
// const {storeurlInfo} = require("../controllers/storeURL")
const {validation} = require("../middleware/validateURL")
const {getAllUrlInfo,getUrlInfo} = require("../controllers/getUrlInfoController")


router.post("/shortcode",validation,UniqueShortCode)
router.get("/redirect/:url",RedirectUrl);

// get url INFo for all and specific one
router.get("/info",getAllUrlInfo);
router.get("/info/:shortcode",getUrlInfo);


module.exports = router