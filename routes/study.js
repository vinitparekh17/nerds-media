const router = require('express').Router();
const { uploadFile, getFiles, getFilesBySubject, deleteFile } = require('../controllers/studyController')

router.route('/uploadFile').post(uploadFile)
router.route('/getFiles').get(getFiles)
router.route('/getFilesBySubject').post(getFilesBySubject)
router.route('/deletefile').post(deleteFile)

module.exports = router;