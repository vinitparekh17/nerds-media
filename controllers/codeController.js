const Codes = require('../models/codeModel');

exports.postCode = async (req, res) => {
    try {
    const newCode = new Codes(req.body)
    await newCode.save();
        res.status(200).json({ success: true, message: 'Code has been saved!' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'Something went wrong!' });
    }
}

exports.getCode = async (req, res) => {
    try {
        const codes = await Codes.find({});
        res.status(200).json({ success: true, codes });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}

exports.deleteCode = async (req, res) => {
    try {
        await Codes.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: 'Code has been deleted' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
}