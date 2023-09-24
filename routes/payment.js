const router = require("express").Router();
const { getPaymentToken, savePayment } = require("../controllers/paymentController")

router.route("/payment").get(getPaymentToken);
router.route("/payment/success").post(savePayment);

module.exports = router;