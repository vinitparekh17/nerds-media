const { addMessage, getMessages, ChatUsers } = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addmsg", addMessage);
router.post("/getmsg", getMessages);
router.post("/chatuser", ChatUsers);

module.exports = router;
