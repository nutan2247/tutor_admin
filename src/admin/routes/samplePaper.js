const express = require("express")
const Sample = require("../models/samplePaper")
const checkToken = require('../middleware/check-token');
const router = express.Router();
const upload = require('../models/sampleFiles')
const path = require("path");
const { sample } = require("lodash");


// **** Get All Sample Paper List **** //
router.get('/sample/list', checkToken, async (req, res) => {
    try {
        const result = await Sample.find();
        return res.status(200).json({
            success: true,
            status: 200,
            count: result.length,
            msg: 'Sample List',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});


// ** Add Sample Paper** //
router.post('/sample/add', checkToken, upload, async (req, res) => {
    if (req.file) {
        upload_document = req.file.path
    }
    try {
        const data = new Sample({
            title: req.body.title,
            class_for: req.body.class_for,
            exam_seating: req.body.exam_seating,
            starting_time: req.body.starting_time,
            time_duration: req.body.time_duration,
            upload_document: req.file.path,
            status:req.body.status,
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


//Sample Paper Edit
router.patch('/sample/update/:_id', checkToken, upload, async (req, res, next) => {
    const _id = req.params._id;

    if (req.file) {
        upload_document = req.file.path
    }
    try {
        await Sample.findByIdAndUpdate({ _id }, {
            $set: {
                title: req.body.title,
                class_for: req.body.class_for,
                exam_seating: req.body.exam_seating,
                starting_time: req.body.starting_time,
                time_duration: req.body.time_duration,
                upload_document: req.file.path,
                status:req.body.status
            },
        }), res.send({ success: true, msg: "Update successfull" });

    } catch (error) {
        return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
    }
})


//Delete Sample Paper
router.delete('/sample/delete/:_id', checkToken, (req, res, next) => {
    const id = req.params._id;
    Sample.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ success: true, msg: result });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err });
        });
});



module.exports = router;