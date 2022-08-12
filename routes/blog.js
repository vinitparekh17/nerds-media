const router = require("express").Router();
const { addBlog, deleteBlog, showBlogs, getBlogById } = require('../controllers/blogsController')

router.route('/addblog').post(addBlog);
router.route('/deleteblog').post(deleteBlog);
router.route('/showblogs').get(showBlogs);
router.route('/getblogbyid').get(getBlogById);

module.exports = router;