const router = require('express').Router()
const {
    logout,
    loginSuccess,
    getAllusers
} = require("../controllers/userController")


router.route('/login/success').get(loginSuccess)
router.route('/logout').get(logout)
router.route('/allusers/:id').get(getAllusers)

module.exports = router;