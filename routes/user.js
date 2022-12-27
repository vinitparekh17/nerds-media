const router = require('express').Router()
const {
    signin,
    getAllusers,
    getUser
} = require("../controllers/userController")


router.route('/signin').post(signin)
router.route('/allusers').post(getAllusers)
router.route('/getuser').post(getUser)

module.exports = router;