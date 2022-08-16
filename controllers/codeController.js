const Codes = require('../models/codeModel');
const webhook = require('../utils/webhook');

exports.postCode = async (req, res) => {
    try {
        const newCode = await Codes.create(req.body);
        if (newCode) {
            res.status(200).json({ success: true, message: 'Code has been saved!' });
        }
    } catch (err) {
        console.log(err);
        webhook(err);
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

exports.getCode = async (req, res) => {
    try {
        const codes = await Codes.find({});
        res.status(200).json({ success: true, codes });
    } catch (err) {
        webhook(err);
        res.status(500).json({ success: false, message: err.message });
    }
}

exports.deleteCode = async (req, res) => {
    try {
        await Codes.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: 'Code has been deleted' });
    } catch (err) {
        webhook(err);
        res.status(500).json({ success: false, message: err.message });
    }
}