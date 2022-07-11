const { Schema, model } = require('mongoose');

const fileSchema = new Schema({
    fileName: String,
    Semester: String,
    Subject: String,
    URL: String
}
    , { timestamps: true });

module.exports = model('File', fileSchema);