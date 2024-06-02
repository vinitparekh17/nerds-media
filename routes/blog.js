const router = require('express').Router();
const {
    addBlog,
    deleteBlog,
    showBlogs,
    reportBlog,
    updateBlog,
    getBlogById,
    Search,
} = require('../controllers/blogsController');

router.route('/addblog').post(addBlog);
router.route('/deleteblog').delete(deleteBlog);
router.route('/showblogs').get(showBlogs);
router.route('/blog/:id').get(getBlogById);
router.route('/reportblog').post(reportBlog);
router.route('/updateblog').put(updateBlog);
router.route('/search').post(Search);

module.exports = router;
