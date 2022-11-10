const express   = require('express'); 
const Subject   = require('../models/subject'); 
const Class     = require('../models/class'); 
const Department= require('../models/department'); 
const Chapter= require('../models/chapter'); 
const mongoose  = require('mongoose'); 
const checkToken= require('../middleware/check-token'); 
const router    = express.Router(); 


// **** Get All Chapters List **** //
router.get('/chapter/list', checkToken, async (req, res) => { 
    try{
        const result = await Chapter.find(); 
        return res.status(200).json({
            success:true,
            count: result.length,
            msg:'Chapter List',
            data: result
        })
    }
    catch(error){
        res.status(500).json({success:false,message: error.message})
    }
});


// ** Add subject** //
router.post('/chapter/add',checkToken, async (req, res) => {
    try{
        const data = new Chapter({
            _id: new mongoose.Types.ObjectId,
            chap_id: req.body.chap_id,
            student_board: req.body.student_board,
            chapter_title: req.body.chapter_title,
            class_id: req.body.class_id,
            subject_id: req.body.subject_id,
            topic_id: req.body.topic_id,
            chapter_description: req.body.chapter_description,
            chapter_document: req.body.chapter_document,
            chapter_video: req.body.chapter_video,
            language_id: req.body.language_id,
            chapter_status: req.body.chapter_status,
            added_at: new Date()
            })
        data
        .save()
        .then(result =>{
            res.status(200).json({
                success: true,
                message:'data stored!'
            });
        })
        .catch(err =>{
                res.status(500).json({
                    success:fasle,
                    error:err
                }); 
            })
    }
    catch(error){
        res.status(500).json({success:false,message: error.message})
    }
});


//Chapter Edit
router.patch('/chapter/update/:_id', checkToken,(req, res, next)=>{

    Subject.findByIdAndUpdate(req.params._id,req.body, (err,emp)=>{
    if (err) {
        return res.status(500).send({success: false, error: "Problem with Updating the recored "})
    };
    res.send({ success:true, msg: "Update successfull"});
    })  
});

//Delete chapter 
router.delete('/chapter/delete/:_id',checkToken, (req, res, next)=>{
    const id = req.params._id;
    Chapter.remove({ _id : id })
    .exec()
    .then( result => {
        res.status(200).json({success:true, msg:result});
    })
    .catch(err => {
        res.status(500).json({success:false, error:err});
    });
});

// **** Get All Subject List **** //
router.get('/subject/list', checkToken, async (req, res) => { 
    try{
        const result = await Subject.find(); 
        return res.status(200).json({
            success:true,
            count: result.length,
            msg:'Subject List',
            data: result
        })
    }
    catch(error){
        res.status(500).json({success:false,message: error.message})
    }
});


// ** Add subject** //
router.post('/subject/add',checkToken, async (req, res) => {
    try{
        const data = new Subject({
            _id: new mongoose.Types.ObjectId,
            sub_id: req.body.sub_id,
            admin_id: req.body.admin_id,
            subject_name: req.body.subject_name,
            sub_name: req.body.sub_name,
            department_id: req.body.department_id,
            sub_status: req.body.sub_status,
            sub_date: new Date()
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
        .catch(err =>{
                console.log(err);
                res.status(500).json({
                    success:false, error:err
                }); 
            })
    }
    catch(error){
        res.status(500).json({success:false,message: error.message})
    }
});

//Suject Edit
router.patch('/subject/update/:_id', checkToken,(req, res, next)=>{

    Subject.findByIdAndUpdate(req.params._id,req.body, (err,emp)=>{
    if (err) {
        return res.status(500).send({success: false, error: "Problem with Updating the recored "})
    };
    res.send({ success:true, msg: "Update successfull"});
    })  
});

//Delete a row 
router.delete('/subject/delete/:_id',checkToken, (req, res, next)=>{
    const id = req.params._id;
    Subject.remove({ _id : id })
    .exec()
    .then( result => {
        console.log(result)
        res.status(200).json({success:true, msg:result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({success:false, error:err});
    });
});

module.exports = router;