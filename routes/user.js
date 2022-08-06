const router = require('express').Router()
const {
    signin,
    getAllusers,
    allUsers,
    getUser
} = require("../controllers/userController")


router.route('/signin').post(signin)
router.route('/allusers/:id').get(getAllusers)
router.route('/allusers').get(allUsers)
router.route('/getuser').post(getUser)

module.exports = router;