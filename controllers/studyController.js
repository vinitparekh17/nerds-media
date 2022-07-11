const StudyModel = require('../models/studyModel');

exports.uploadFile = async (req, res, next) => {
    try {
        const data = await StudyModel.create(req.body);

        if (data) {
            return res.status(200).json({ success: true, message: "File uploaded successfully." });
        }
        else {
            return res.status(404).json({ success: false, message: "Failed to upload file to the database" });
        }
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.getFiles = async (req, res, next) => {
    try {
        const data = await StudyModel.find({});
        if (data) {
            return res.status(200).json(data);
        }
        else {
            return res.status(404).json({ message: "Failed to get files from the database" });
        }
    } catch (error) {
        console.log(error);
        next();
    }
}

// find files by subject
exports.getFilesBySubject = async (req, res, next) => {
    try {
        const data = await StudyModel.find({ Subject: req.body.subject });
        if (data) {
            return res.status(200).json(data);
        }
        else {
            return res.status(404).json({ message: "Failed to get files from the database" });
        }
    } catch (error) {
        console.log(error);
        next();
    }
}
