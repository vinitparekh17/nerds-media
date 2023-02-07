const router = require("express").Router();
const { getUsers, getBlogs, getCodes, getFiles } = require("../controllers/adminController");

router.route("/admin/getusers").get(getUsers);
router.route("/admin/getblogs").get(getBlogs);
router.route("/admin/getcodes").get(getCodes);
router.route("/admin/getfiles").get(getFiles);

module.exports = router;