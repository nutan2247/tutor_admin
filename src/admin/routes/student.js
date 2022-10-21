require('dotenv').config(); //get env variables

const express   = require('express'); 
const Class     = require('../models/class'); 
const Department= require('../models/department'); 
const mongoose  = require('mongoose'); 
const auth      = require('../middleware/check-token'); 
const router    = express.Router(); 

// **** All Student List **** //
router.get('/student/list', auth, async (req, res) => {
    try{
        const result = await Banner.find(); 
        return res.status(200).json({
            status:200,
            count: result.length,
            msg:'Banner List',
            data: result
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

// **** All Class List **** //
router.get('/class/list', auth, async (req, res) => {
    try{
        const data = await Class.find(); 
        return res.status(200).json({
            success:true,
            msg:'All Class List',
            data: data
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// ** Add Class** //
router.post('/class/add',auth, async (req, res) => {
    try{
        const data = new Class({
            _id: new mongoose.Types.ObjectId,
            class_id: req.body.class_id,
            class_name: req.body.class_name,
            status: 1
            })
        data
        .save()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                success: true,
                message:'data stored!'
            });
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Update Class
router.patch('/class/update/:_id', auth,  (req, res)=>{
    Class.findByIdAndUpdate(req.params._id,req.body, (err,emp)=>{
    if (err) {
        return res.status(500).send({success: false, error: "Problem with Updating the recored "})
    };
    res.send({ success:true, msg: "Update successfull"});
    })  
});

//Delete a Class 
router.delete('/class/delete/:_id', auth,(req, res, next)=>{
    const id = req.params._id;
    Class.remove({ _id : id })
    .exec()
    .then( result => {
        res.status(200).json({success: true, msg:result });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({success:false, msg:err});
    });
});

// **** All Department List **** //
router.get('/department/list', auth, async (req, res) => {
    try{
        const data = await Department.find(); 
        return res.status(200).json({
            success:true,
            msg:'All Departments List',
            data: data
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// ** Add Department ** //
router.post('/department/add',auth, async (req, res) => {
    try{
        const data = new Department({
            _id: new mongoose.Types.ObjectId,
            id: req.body.id,
            name: req.body.name,
            subject_id: req.body.subject_id
            })
        data
        .save()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                success: true,
                message:'data stored!'
            });
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

//Update Department
router.patch('/department/update/:_id', auth,  (req, res)=>{
    Department.findByIdAndUpdate(req.params._id,req.body, (err,emp)=>{
    if (err) {
        return res.status(500).send({success: false, error: "Problem with Updating the recored "})
    };
    res.send({ success:true, msg: "Update successfull"});
    })  
});

//Delete a Department 
router.delete('/department/delete/:_id', auth,(req, res, next)=>{
    const id = req.params._id;
    Department.remove({ _id : id })
    .exec()
    .then( result => {
        res.status(200).json({success: true, msg:result });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({success:false, msg:err});
    });
});
module.exports = router;