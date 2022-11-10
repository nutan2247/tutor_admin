const express   = require('express'); 
const questionSet   = require('../models/questionSetPaper'); 
const mongoose  = require('mongoose'); 
const checkToken= require('../middleware/check-token'); 
const router    = express.Router(); 


// **** Get All questionSet List **** //
router.get('/questionSet/list',checkToken, async (req, res) => { 
    try{
        const result = await questionSet.find(); 
        return res.status(200).json({
            success:true,
            status:200,
            count: result.length,
            msg:'questionSet List',
            data: result
        })
    }
    catch(error){
        res.status(500).json({success:false, message: error.message})
    }
});


// ** Add questionSet** //
router.post('/questionSet/add',checkToken, async (req, res) => {
    try{
        const data = new questionSet({
            //_id: new mongoose.Types.ObjectId,
            //qps_id: req.body.qps_id,
            chapter_name: req.body.chapter_name,
            admin_id: req.body.admin_id,
            subject:req.body.subject,
            qps_title: req.body.qps_title,
            qps_time: req.body.qps_time,
            qps_mark: req.body.qps_mark,
            //qps_negative_mark: req.body.qps_negative_mark,
            no_of_ques: req.body.no_of_ques,
            qps_language: req.body.qps_language,
            //ques_ids: req.body.ques_ids,
            qps_date: req.body.qps_date,
            solution_video:req.body.solution_video,
            solution_pdf:req.body.solution_pdf,
            qps_status:req.body.qps_status,
            addedat:new Date()
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
                    success:false,
                    error:err
                }); 
            })
    }
    catch(error){
        res.status(500).json({success:false, message: error.message})
    }
});


//QuestionSet Edit
router.patch('/questionSet/update/:_id',checkToken, (req, res, next)=>{

    questionSet.findByIdAndUpdate(req.params._id,req.body, (err,emp)=>{
    if (err) {
        return res.status(500).send({success: false, error: "Problem with Updating the recored "})
    };
    res.send({ success:true, msg: "Update successfull"});
    })  
});

//Delete QuestionSet
router.delete('/questionSet/delete/:_id',checkToken, (req, res, next)=>{
    const id = req.params._id;
    questionSet.deleteOne({ _id : id })
    .exec()
    .then( result => {
        res.status(200).json({success:true, msg:result});
    })
    .catch(err => {
        res.status(500).json({success:false, error:err});
    });
});



module.exports = router;