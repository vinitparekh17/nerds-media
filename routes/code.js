const router = require("express").Router();
const {
    postCode,
    deleteCode,
    getCode,
    updateCode,
    reportCode
} = require('../controllers/codeController');

router.route('/showcodes').get(getCode);
router.route('/reportcode').get(reportCode);
router.route('/addcode').post(postCode);
router.route('/deletecode').delete(deleteCode);
router.route('/updatecode').put(updateCode);

module.exports = router;