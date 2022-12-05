const express = require('express');
const Topic = require('../models/topic');
const mongoose = require('mongoose');
const checkToken = require('../middleware/check-token');
const upload = require("../models/topicUploaddocument")
const router = express.Router();


// **** Get All Topic List **** //
router.get('/topic/list', checkToken, async (req, res) => {
    try {
        const result = await Topic.find();
        return res.status(200).json({
            success: true,
            status: 200,
            count: result.length,
            msg: 'Topics List',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});


// ** Add Batches** //
router.post('/topic/add', checkToken, upload, async (req, res) => {
    
    if (req.file) {
        upload_document = req.file.path
    }
    try {
        const data = new Topic({
            name: req.body.name,
            status: req.body.status,
            youtube_video:req.body.youtube_video,
            upload_document:req.file.path,
            class:req.body.class,
            subject:req.body.subject,
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


//Batches Edit
router.patch('/topic/update/:_id', checkToken, (req, res, next) => {

    Topic.findByIdAndUpdate(req.params._id, req.body, (err, emp) => {
        if (err) {
            return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
        };
        res.send({ success: true, msg: "Update successfull" });
    })
});

//Delete Batches
router.delete('/topic/delete/:_id', checkToken, (req, res, next) => {
    const id = req.params._id;
    Topic.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ success: true, msg: result });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err });
        });
});



module.exports = router;