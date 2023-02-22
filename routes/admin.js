const router = require("express").Router();
const {
    getUsers,
    getBlogs,
    getCodes,
    getFiles,
    getUserById,
    getBlogsById,
    getCodesById,
    getFilesById,
    deleteUser,
    deleteBlog,
    deleteCode,
    deleteFile,
} = require("../controllers/adminController");

router.route("/admin/getuser").get(getUsers);
router.route("/admin/getblog").get(getBlogs);
router.route("/admin/getcode").get(getCodes);
router.route("/admin/getfile").get(getFiles);

router.route("/admin/getuser/:id").get(getUserById);
router.route("/admin/getblog/:id").get(getBlogsById);
router.route("/admin/getcode/:id").get(getCodesById);
router.route("/admin/getfile/:id").get(getFilesById);

router.route("/admin/deleteuser/:id").delete(deleteUser);
router.route("/admin/deleteblog/:id").delete(deleteBlog);
router.route("/admin/deletecode/:id").delete(deleteCode);
router.route("/admin/deletefile/:id").delete(deleteFile);

module.exports = router;