const router = require("express").Router();
const { addBlog, deleteBlog, showBlogs, reportBlog, updateBlog, Search } = require('../controllers/blogsController')

router.route('/addblog').post(addBlog);
router.route('/deleteblog').post(deleteBlog);
router.route('/showblogs').get(showBlogs);
router.route('/reportblog').post(reportBlog);
router.route('/updateblog').post(updateBlog);
router.route('/search').post(Search);

module.exports = router;