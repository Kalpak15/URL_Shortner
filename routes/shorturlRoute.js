const express = require('express')

const router = express.Router();

const {UniqueShortCode} = require("../controllers/generateShortURL")
const {RedirectUrl} = require("../controllers/redirectController")
const {storeurlInfo} = require("../controllers/storeURL")

router.post("/shortcode",UniqueShortCode);
router.get("/redirect",RedirectUrl);

module.exports = router