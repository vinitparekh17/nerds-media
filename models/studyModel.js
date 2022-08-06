const { Schema, model } = require('mongoose');

const fileSchema = new Schema({
    fileName: String,
    Semester: String,
    Subject: String,
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    URL: String
}
    , { timestamps: true });

module.exports = model('File', fileSchema);