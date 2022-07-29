const { addMessage, getMessages, ChatUsers } = require("../controllers/messageController");
const router = require("express").Router();

router.route("/addmsg").post(addMessage);
router.route("/getmsg").post(getMessages);
router.route("/chatuser").post(ChatUsers);

module.exports = router;
