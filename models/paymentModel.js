const { Schema, model } = require('mongoose');

const paymentSchema = new Schema(
    {
        razorpay_payment_id: {
            type: String,
            required: true,
        },
        razorpay_order_id: {
            type: String,
            required: true,
        },
        razorpay_signature: {
            type: String,
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = new model('Payment', paymentSchema);
