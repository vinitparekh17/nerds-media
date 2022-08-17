const router = require("express").Router();
const {
    postCode,
    deleteCode,
    getCode,
    updateCode,
    reportCode
} = require('../controllers/codeController');

router.route('/addcode').post(postCode);
router.route('/deletecode').post(deleteCode);
router.route('/showcodes').get(getCode);
router.route('/updatecode').post(updateCode);
router.route('/reportcode').post(reportCode);

module.exports = router;