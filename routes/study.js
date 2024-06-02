const router = require('express').Router();
const {
    uploadFile,
    getFiles,
    getFilesBySubject,
    deleteFile,
    sendOldFiles,
    reportFile,
} = require('../controllers/studyController');

router.route('/getFiles').get(getFiles);
router.route('/reportfile').get(reportFile);
router.route('/sendOldFiles').get(sendOldFiles);
router.route('/uploadFile').post(uploadFile);
router.route('/deletefile').delete(deleteFile);

module.exports = router;
