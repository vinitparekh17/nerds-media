const router = require('express').Router()
const {
    signin,
    allUsers,
    getUser
} = require("../controllers/userController")


router.route('/signin').post(signin)
router.route('/allusers').get(allUsers)
router.route('/getuser').post(getUser)

module.exports = router;