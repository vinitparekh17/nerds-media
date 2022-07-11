const router = require('express').Router();
const { uploadFile, getFiles, getFilesBySubject } = require('../controllers/studyController')

router.route('/uploadFile').post(uploadFile)
router.route('/getFiles').get(getFiles)
router.route('/getFilesBySubject/:subject').post(getFilesBySubject)

module.exports = router;