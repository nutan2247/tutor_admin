require('dotenv').config(); //get env variables

const express = require('express');
const Class = require('../models/class');
const student = require("../models/student")
const Department = require('../models/department');
const mongoose = require('mongoose');
const auth = require('../middleware/check-token');
const router = express.Router();

// **** All Student List **** //
router.get('/student/list', auth, async (req, res) => {
    try {
        const result = await student.find();
        return res.status(200).json({
            status: 200,
            count: result.length,
            msg: 'student List',
            data: result
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Add student Data
router.post('/student/add', auth, async (req, res) => {
    try {
        const data = new student({
            //_id: new mongoose.Types.ObjectId,
            board: req.body.board,
            admin_id: req.body.admin_id,
            class_id: req.body.class_id,
            select_batch_time: req.body.select_batch_time,
            name: req.body.name,
            father_name: req.body.father_name,
            mother_name: req.body.mother_name,
            email: req.body.email,
            password: req.body.password,
            sex: req.body.sex,
            mobile_number: req.body.mobile_number,
            contact_number_father: req.body.contact_number_father,
            date_of_birth: req.body.date_of_birth,
            address: req.body.address,
            payment_type: req.body.payment_type,
            fee_amount: req.body.fee_amount,
            payment_mode: req.body.payment_mode,
            roll_no: req.body.roll_no,
            notification_count: req.body.notification_count,
            session: req.body.session,
            exam_seating: req.body.exam_seating,
            login_code: req.body.login_code,
            status: req.body.status,
            added_at: req.body.added_at,
            modified_at: req.body.modified_at,
            student_photo: req.body.student_photo
        })
       
        data
            .save()
            .then(result => {
                res.status(200).json({
                    success: true,
                    message: 'data stored!'
                });
            })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Update Student Data
router.patch('/student/update/:_id', auth, (req, res) => {
    student.findByIdAndUpdate(req.params._id, req.body, (err, emp) => {
        if (err) {
            return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
        };
        res.send({ success: true, msg: "Update successfull" });
    })
});

//Delete Student Data
router.delete('/student/delete/:_id', auth, (req, res, next) => {
    const id = req.params._id;
    student.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ success: true, msg: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, msg: err });
        });
});







// **** All Class List **** //
router.get('/class/list', auth, async (req, res) => {
    try {
        const data = await Class.find();
        return res.status(200).json({
            success: true,
            msg: 'All Class List',
            data: data
        })
    }
    catch (error) {
        res.status(500).json({success:false, message: error.message })
    }
})

// ** Add Class** //
router.post('/class/add', auth, async (req, res) => {
    try {
        const data = new Class({
            class_name: req.body.class_name,
            status: req.body.status
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
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Update Class
router.patch('/class/update/:_id', auth, (req, res) => {
    Class.findByIdAndUpdate(req.params._id, req.body, (err, emp) => {
        if (err) {
            return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
        };
        res.send({ success: true, msg: "Update successfull" });
    })
});

//Delete a Class 
router.delete('/class/delete/:_id', auth, (req, res, next) => {
    const id = req.params._id;
    Class.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ success: true, msg: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, msg: err });
        });
});





// **** All Department List **** //
router.get('/department/list', auth, async (req, res) => {
    try {
        const data = await Department.find();
        return res.status(200).json({
            success: true,
            msg: 'All Departments List',
            data: data
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// ** Add Department ** //
router.post('/department/add', auth, async (req, res) => {
    try {
        const data = new Department({
            _id: new mongoose.Types.ObjectId,
            id: req.body.id,
            name: req.body.name,
            subject_id: req.body.subject_id
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
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//Update Department
router.patch('/department/update/:_id', auth, (req, res) => {
    Department.findByIdAndUpdate(req.params._id, req.body, (err, emp) => {
        if (err) {
            return res.status(500).send({ success: false, error: "Problem with Updating the recored " })
        };
        res.send({ success: true, msg: "Update successfull" });
    })
});

//Delete a Department 
router.delete('/department/delete/:_id', auth, (req, res, next) => {
    const id = req.params._id;
    Department.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({ success: true, msg: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ success: false, msg: err });
        });
});
module.exports = router;