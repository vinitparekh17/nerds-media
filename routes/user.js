const router = require('express').Router()
const {
    signin,
    getAllusers,
    getUser,
    blogUser,
    deleteUser
} = require("../controllers/userController")


router.route('/signin').post(signin)
router.route('/allusers').post(getAllusers)
router.route('/getuser').post(getUser)
router.route('/bloguser').get(blogUser)
router.route('/deleteuser/:id').delete(deleteUser)

module.exports = router;