const express = require("express")
const mongoose = require("mongoose")
const Payment = require("../models/payment")
const PaymentLog = require("../models/paymentLog")
const router = express.Router()
const checkToken = require('../middleware/check-token');


//payment list
router.get("/payment/list",checkToken, async (req, res) => {
    try {
        const payment = await Payment.find()
        return res.status(200).json({ success: true, data: payment })
    } catch (err) {
        return res.status(401).json({ success: false, msg: err.message })
    }
})

//payment list get by id
router.post("/payment/transaction",checkToken, async (req, res) => {
    const id = req.body._id
    try {
        const payment = await Payment.findById({ _id: id })
        return res.status(200).json({ success: true, data: payment })
    } catch (err) {
        return res.status(401).json({ success: false, msg: err.message })
    }
})

//paymentlog list get by id
router.post("/paymentlog/transaction", async (req, res) => {
    const id =new mongoose.Types.ObjectId(req.body._id)
    console.log(id)
    try {
        const Paymentlog = await PaymentLog.findById({_id:id})
        return res.status(200).json({ success: true, data: Paymentlog })
    } catch (err) {
        return res.status(401).json({ success: false, msg: err.message })
    }
})
module.exports = router