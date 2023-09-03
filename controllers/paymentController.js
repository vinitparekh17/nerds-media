const Razorpay = require('razorpay');
const User = require('../models/userModel');
const Webhook = require('../utils/webhook');
const { RAZOR_ID, RAZOR_SECRET } = process.env;

const RazorClient = new Razorpay({
    key_id: RAZOR_ID,
    key_secret: RAZOR_SECRET,
    headers: {
        "Content-Type": "application/json"
    }
})

exports.getPaymentToken = async (req, res) => {
    try {
        const { price } = req.query;
        let opt = {
            amount: parseInt(price) * 100,
            currency: "INR",
            receipt: new Date().getTime().toString()
        }

        RazorClient.orders.create(opt, (err, order) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 'error',
                    message: err.message
                })
            }
            return res.status(201).json({
                status: 'success',
                data: order
            })
        })

    } catch (error) {
        Webhook(error)
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}

exports.savePayment = async (req, res) => {
    try {
        
    } catch (error) {
        Webhook(error)
        return res.status(500).json({
            status: 'error',
            message: error.message
        })
    }
}