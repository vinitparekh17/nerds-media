const { model, Schema } = require('mongoose');

const CodeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reported: {
        type: Boolean,
        default: false
    }
});

module.exports = new model('Codes', CodeSchema);