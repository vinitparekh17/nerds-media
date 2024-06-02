const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        reported: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

module.exports = new model('Blog', blogSchema);
