const express = require('express')

const router = express.Router();

const {UniqueShortCode} = require("../controllers/generateShortURL")
const {storeurlInfo} = require("../controllers/storeURL")

router.get("/shortcode",UniqueShortCode);
router.get("/storeURL",storeurlInfo);

module.exports = router