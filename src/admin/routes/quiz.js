const express   = require('express'); 
const question   = require('../models/question'); 
const mongoose  = require('mongoose'); 
const checkToken= require('../middleware/check-token'); 
const router    = express.Router(); 


// **** Get All question List **** //
router.get('/quiz/list',async (req, res) => { 
    try{
        const result = await question.find(); 
        return res.status(200).json({
            success:true,
            status:200,
            count: result.length,
            msg:'quiz List',
            data: result
        })
    }
    catch(error){
        res.status(500).json({success:false, message: error.message})
    }
});


// ** Add question** //
router.post('/quiz/add',async (req, res) => {
    try{
        const data = new question({
            //_id: new mongoose.Types.ObjectId,
            set_id: req.body.set_id,
            subject_id: req.body.subject_id,
            admin_id: req.body.admin_id,
            qp_title: req.body.qp_title,
            qp_image: req.body.qp_image,
            qp_ans_value: req.body.qp_ans_value,
            qp_type: req.body.qp_type,
            qp_option1: req.body.qp_option1,
            qp_option2: req.body.qp_option2,
            qp_option3: req.body.qp_option3,
            qp_option4: req.body.qp_option4,
            qp_text:req.body.qp_text,
            qp_status:req.body.qp_status,
            add_date: new Date()
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


//Question Edit
router.patch('/quiz/update/:_id',(req, res, next)=>{

    question.findByIdAndUpdate(req.params._id,req.body, (err,emp)=>{
    if (err) {
        return res.status(500).send({success: false, error: "Problem with Updating the recored "})
    };
    res.send({ success:true, msg: "Update successfull"});
    })  
});

//Delete Question 
router.delete('/quiz/delete/:_id', (req, res, next)=>{
    const id = req.params._id;
    question.deleteOne({ _id : id })
    .exec()
    .then( result => {
        res.status(200).json({success:true, msg:result});
    })
    .catch(err => {
        res.status(500).json({success:false, error:err});
    });
});



module.exports = router;