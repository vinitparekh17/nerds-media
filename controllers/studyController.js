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
        res.status(500).json({
            success: false,
            message: "Failed to upload file to the database"
        });
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
        res.status(500).json({
            success: false,
            message: "Failed to get files from the database"
        });
    }
}

exports.getFilesBySubject = async (req, res, next) => {
    const { subject } = req.body;
    try {

        // deleting the files that are older than 5 days
        const oldFiles = await StudyModel.find({ "createdAt": { $lt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) } });
        if (oldFiles) {
            oldFiles.forEach(async file => {
                await file.remove();
            })
        }

        // get the list of files by subject
        const data = await StudyModel.find({ Subject: subject });
        if (data) {
            return res.status(200).json(data);
        }
        else {
            return res.status(404).json({ message: "Failed to get files from the database" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to get files from the database"
        });
    }
}

exports.deleteFile = async (req, res, next) => {
    try {
        const { id } = req.body;
        const data = await StudyModel.findByIdAndDelete(id);
        if (data) {
            return res.status(200).json({ success: true, message: "File deleted successfully." });
        }
        else {
            return res.status(404).json({ success: false, message: "Failed to delete file from the database" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete file from the database"
        });
    }
}
