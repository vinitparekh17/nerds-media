const router = require('express').Router();
const { uploadFile, getFiles, getFilesBySubject, deleteFile, sendOldFiles } = require('../controllers/studyController')

router.route('/uploadFile').post(uploadFile)
router.route('/getFiles').get(getFiles)
router.route('/getFilesBySubject').post(getFilesBySubject)
router.route('/deletefile').post(deleteFile)
router.route('/sendOldFiles').get(sendOldFiles)

module.exports = router;