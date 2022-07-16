const { Schema, model } = require('mongoose');

const fileSchema = new Schema({
    fileName: String,
    Semester: String,
    Subject: String,
    Author: Schema.Types.ObjectId,
    URL: String
}
    , { timestamps: true });

module.exports = model('File', fileSchema);