const express = require('express');
const Topic = require('../models/topic');
const mongoose = require('mongoose');
const checkToken = require('../middleware/check-token');
const Class = require("../models/class")
const Subject = require("../models/subject")

const upload1 = require("../models/topicUploaddocument")
const router = express.Router();


// **** Get All Topic List **** //
router.get('/topic/list', checkToken, async (req, res) => {
    try {
        var resultArr = [];
        const Alltopic = await Topic.find();

        for (const [_, value] of Object.entries(Alltopic)) {
            const subjectdata = await Subject.findOne({_id:value.subject_id});
            const classdata = await Class.findOne({_id:subjectdata.class_id});

            var topic = {
                topic_id: value._id,
                class_id: subjectdata.class_id,
                class_name: classdata.class_name,
                subject_id: value.subject_id,
                subject_name: subjectdata.subject_name,
                upload_pdf:value.upload_pdf,
                date: value.date,
                status: value.status,
            };
            resultArr.push(topic);
        }
        return res.status(200).json({
            success: true,
            status: 200,
            count: resultArr.length,
            msg: 'Topics List',
            data: resultArr
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});


// ** Add Batches** //
router.post('/topic/add', checkToken, upload1, async (req, res) => {
    
    if (req.file) {
        upload_document = req.file.path
    }
    try {
        const data = new Topic({
           chapter_id:req.body.chapter_id,
           subject_id:req.body.subject_id,
           upload_video:req.body.upload_video,
           upload_pdf:req.file.path,
           status:req.body.status
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


//Topic Edit
router.patch('/topic/update/:_id', checkToken, upload1, async (req, res, next) => {
    const _id = req.params._id;

    if (req.file) {
        upload_pdf = req.file.path
    }
    try {
        await Topic.findByIdAndUpdate({ _id }, {
            $set: {
                chapter_id: req.body.chapter_id,
                student_id: req.body.student_id,
                upload_video: req.body.upload_video,
                upload_pdf: req.file.path,
                status:req.body.status
            },
        }), res.send({ success: true, msg: "Update successfull" });

    } catch (error) {
        return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
    }
})

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