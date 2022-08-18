const router = require("express").Router();
const { addBlog, deleteBlog, showBlogs, reportBlog, updateBlog } = require('../controllers/blogsController')

router.route('/addblog').post(addBlog);
router.route('/deleteblog').post(deleteBlog);
router.route('/showblogs').get(showBlogs);
router.route('/reportblog').post(reportBlog);
router.route('/updateblog').post(updateBlog);

module.exports = router;