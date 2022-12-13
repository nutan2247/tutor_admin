const express   = require('express'); 
const questionSet   = require('../models/questionSetPaper'); 
const Subject = require('../models/subject');
const Class = require('../models/class');
const mongoose  = require('mongoose'); 
const checkToken= require('../middleware/check-token'); 
const router    = express.Router(); 


// **** Get All questionSet List **** //
router.get('/questionSet/list',checkToken, async (req, res) => { 
    try{
        var questionArr=[]
        const result = await questionSet.find(); 
        for (const [_, value] of Object.entries(result)) {
            const classdata = await Class.findOne({_id:value.class_id})
            const subjectdata = await Subject.findById({_id:value.subject_id})
            console.log(subjectdata)
            if(subjectdata){
     
            var question = {
                _id: value._id,
                class_id: value.class_id,
                class_name: classdata.class_name,
                subject_id: value.subject_id,
                name: subjectdata.name,
                qps_title: value.qps_title,
                qps_time: value.qps_time,
                qps_mark: value.qps_mark,
                no_of_ques: value.no_of_ques,
                qps_language: value.qps_language,
                qps_date: value.qps_date,
                solution_pdf:value.solution_pdf,
                qps_status:value.qps_status,
                date: value.date,
                status: value.status,
            };
            questionArr.push(question);
            }
        }
        return res.status(200).json({
            success:true,
            status:200,
            count: result.length,
            msg:'questionSet List',
            data: questionArr
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
            class_id: req.body.class_id,
            subject_id:req.body.subject_id,
            qps_title: req.body.qps_title,
            qps_time: req.body.qps_time,
            qps_mark: req.body.qps_mark,
            no_of_ques: req.body.no_of_ques,
            qps_language: req.body.qps_language,
            qps_date: req.body.qps_date,
            solution_pdf:req.body.solution_pdf,
            qps_status:req.body.qps_status,
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