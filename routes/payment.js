const router = require("express").Router();
const { getPaymentToken } = require("../controllers/paymentController")

router.route("/payment").get(getPaymentToken);

module.exports = router;