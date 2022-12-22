const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const Notification = require("../models/notify")
const checkToken = require('../middleware/check-token');

//Create notification
router.post('/notification/add',checkToken, async (req, res) => {
    try {
        const data = new Notification({
            notification_title: req.body.notification_title,
            notification_description: req.body.notification_description,
            notification_for: req.body.notification_for,
            sent_on: req.body.sent_on,
            status: req.body.status,
            is_seen: req.body.is_seen,
            addedat: new Date()
        })
        data
            .save()
            .then(result => {
                res.status(200).json({
                    success: true,
                    message: 'data stored!'
                });
            })
            .catch(err => {
                res.status(500).json({
                    success: false,
                    error: err
                });
            })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});

//Read the notification
router.get("/notification/list",checkToken, async(req,res)=>{
    try{
        const data = await Notification.find()
        return res.status(200).json({success:true, data:data})
    }catch(err){
        return res.status(401).json({success:false, msg:err.message})
    }
})

//Notification Edit
router.patch('/notification/update/:_id',checkToken, (req, res, next) => {

    Notification.findByIdAndUpdate(req.params._id, req.body, (err, emp) => {
        if (err) {
            return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
        };
        res.send({ success: true, msg: "Update successfull" });
    })
});

//Delete notifications
router.delete('/notification/delete/:_id',checkToken, (req, res, next) => {
    const id = req.params._id;
    Notification.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ success: true, msg: result });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err });
        });
});

module.exports = router