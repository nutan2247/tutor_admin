const express   = require('express'); 
const question   = require('../models/question'); 
const mongoose  = require('mongoose'); 
const checkToken= require('../middleware/check-token'); 
const router    = express.Router(); 


// **** Get All question List **** //
router.get('/quiz/list',checkToken, async (req, res) => { 
   
    try{
        const result = await question.aggregate([
            {
                $lookup:
                {
                    from: "questionsets",
                    localField: "set",
                    foreignField: "_id",
                    as: "result"
                }
              },{ $project:{ "result.chapter_name": 0, "result.qps_title": 0, "result.qps_time": 0, "result.qps_mark": 0, "result.no_of_ques": 0, "result.ques_ids": 0, "result.qps_date": 0, "result.solution_pdf": 0, "__v": 0, "result.qp_status": 0 } }
      ])
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
router.post('/quiz/add',checkToken, async (req, res) => {
    try{
        const data = new question({
            //_id: new mongoose.Types.ObjectId,
            set:req.body.set,
            question:req.body.question,
            options:req.body.options,
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
router.patch('/quiz/update/:_id',checkToken, (req, res, next)=>{

    question.findByIdAndUpdate(req.params._id,req.body, (err,emp)=>{
    if (err) {
        return res.status(500).send({success: false, error: "Problem with Updating the recored "})
    };
    res.send({ success:true, msg: "Update successfull"});
    })  
});

//Delete Question 
router.delete('/quiz/delete/:_id',checkToken, (req, res, next)=>{
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