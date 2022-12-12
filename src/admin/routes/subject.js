const express = require('express');
const Subject = require('../models/subject');
const Class = require('../models/class');
const Department = require('../models/department');
const Chapter = require('../models/chapter');
const mongoose = require('mongoose');
const checkToken = require('../middleware/check-token');
const { validationResult } = require('express-validator');
//const chapter = require('../models/chapter');
const router = express.Router();


// **** Get All Chapters List **** //
router.get('/chapter/list', checkToken, async (req, res) => {
    try {
        var resultArr = [];
        const Allchapter = await Chapter.find();
        for (const [_, value] of Object.entries(Allchapter)) {
            const subjectdata = await Subject.findOne({_id:value.subject_id});
            console.log(subjectdata)
            const classdata = await Class.findOne({_id:value.class_id});

            var chapter = {
                _id: value._id,
                class_id: value.class_id,
                class_name: classdata.class_name,
                subject_id: value.subject_id,
                subject_name: subjectdata.subject_name,
                board:value.board,
                language:value.language,
                chapter_title:value.chapter_title,
                date: value.date,
                status: value.status,
            };
            resultArr.push(chapter);
        }
        return res.status(200).json({
            success: true,
            count: resultArr.length,
            msg: 'Chapter List',
            data: resultArr
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});


// ** Add subject** //
router.post('/chapter/add', checkToken, async (req, res) => {
    try {
        const data = new Chapter({
            class_id: req.body.class_id,
            subject_id: req.body.subject_id,
            board: req.body.board,
            language: req.body.language,
            chapter_title: req.body.chapter_title,
            description:req.body.description,
            status: req.body.status,
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


//Chapter Edit
router.patch('/chapter/update/:_id', checkToken, (req, res) => {

    Chapter.findByIdAndUpdate(req.params._id, req.body, (err, emp) => {
        if (err) {
            return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
        };
        res.send({ success: true, msg: "Update successfull" });
    })
});

//Delete chapter 
router.delete('/chapter/delete/:_id', checkToken, (req, res, next) => {
    const id = req.params._id;
    Chapter.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ success: true, msg: result });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err });
        });
});






// **** Get All Subject List **** //
router.get('/subject/list', checkToken, async (req, res) => {
    try {
        var resultArr = [];
        const Allsubject = await Subject.find();
        for (const [_, value] of Object.entries(Allsubject)) {
            const classdata = await Class.find({_id:value.class_id});
            var subject = {
                class_id: value.class_id,
                class_name: classdata.class_name,
                subject_id: value._id,
                subject_name: value.subject_name,
                image: value.image,
                status: value.status,
                date: value.date,
            };
            resultArr.push(subject);
        }
        return res.status(200).json({
            success: true,
           // count: result.length,
            msg: 'Subject List',
            data: resultArr
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});


// ** Add subject** //
router.post('/subject/add', checkToken, async (req, res) => {
    try {
        const data = new Subject({
            class_id: req.body.class_id,
            subject_name: req.body.subject_name,
            image: req.body.image,
            status: req.body.status,
            date: new Date()
        })
        data
            .save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    success: true,
                    message: 'data stored!'
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    success: false, error: err
                });
            })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});

//Suject Edit
router.patch('/subject/update/:_id', checkToken, (req, res, next) => {

    Subject.findByIdAndUpdate(req.params._id, req.body, (err, emp) => {
        if (err) {
            return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
        };
        res.send({ success: true, msg: "Update successfull" });
    })
});

//Delete a row 
router.delete('/subject/delete/:_id', checkToken, (req, res, next) => {
    const id = req.params._id;
    Subject.remove({ _id: id })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({ success: true, msg: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, error: err });
        });
});

module.exports = router;