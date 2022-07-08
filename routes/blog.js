const router = require("express").Router();
const { addBlog, deleteBlog, showBlogs } = require('../controllers/blogsController')

router.route('/addblog').post(addBlog);
router.route('/deleteblog').delete(deleteBlog);
router.route('/showblogs').get(showBlogs);

module.exports = router;