const express = require('express');
const Batch = require('../models/batches');
const mongoose = require('mongoose');
const checkToken = require('../middleware/check-token');
const router = express.Router();


// **** Get All Batches List **** //
router.get('/batch/list', checkToken, async (req, res) => {
    try {
        const result = await Batch.find();
        return res.status(200).json({
            success: true,
            status: 200,
            count: result.length,
            msg: 'Batches List',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
});


// ** Add Batches** //
router.post('/batch/add', checkToken, async (req, res) => {
    try {
        const data = new Batch({
            board: req.body.board,
            class_name: req.body.class_name,
            batch_start_time: req.body.batch_start_time,
            batch_end_time: req.body.batch_end_time,
            status: req.body.status,
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
router.patch('/batch/update/:_id', checkToken, (req, res, next) => {

    Batch.findByIdAndUpdate(req.params._id, req.body, (err, emp) => {
        if (err) {
            return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
        };
        res.send({ success: true, msg: "Update successfull" });
    })
});

//Delete Batches
router.delete('/batch/delete/:_id', checkToken, (req, res, next) => {
    const id = req.params._id;
    Batch.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ success: true, msg: result });
        })
        .catch(err => {
            res.status(500).json({ success: false, error: err });
        });
});



module.exports = router;