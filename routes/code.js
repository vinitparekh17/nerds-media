const router = require("express").Router();
const {
    postCode,
    deleteCode,
    getCode
} = require('../controllers/codeController');

router.route('/addcode').post(postCode);
router.route('/deletecode').post(deleteCode);
router.route('/showcodes').get(getCode);

module.exports = router;