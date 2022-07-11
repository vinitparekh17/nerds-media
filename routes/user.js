const router = require('express').Router()
const {
    logout,
    loginSuccess,
    getAllusers,
    allUsers
} = require("../controllers/userController")


router.route('/login/success').get(loginSuccess)
router.route('/logout').get(logout)
router.route('/allusers/:id').get(getAllusers)
router.route('/allusers').get(allUsers)

module.exports = router;