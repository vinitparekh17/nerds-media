const router = require('express').Router()
const {
    getMusic
} = require("../controllers/musicController")

router.route('/getmusic').get(getMusic)

module.exports = router;