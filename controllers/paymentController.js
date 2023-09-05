const Razorpay = require('razorpay');
const mailer = require('../utils/nodeMailer');
const Payment = require('../models/paymentModel');
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
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
        const { id } = req.query;

        RazorClient.payments.fetch(razorpay_payment_id, async (err, payment) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    status: 'error',
                    message: err.message
                })
            }

            const { email, name } = payment.notes;
            await mailer({
                email,
                subject: `Payment Successfull | Technetic`,
                text: `Hi ${name}, your payment of ₹${payment.amount / 100} has been successfully received.`
            })
            const newPayment = new Payment({
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                userId: id
            })
            await newPayment.save();
            return res.status(201).json({
                status: 'success',
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