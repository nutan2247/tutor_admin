require('dotenv').config(); //get env variables

const express   = require('express'); 
const Class      = require('../models/class'); 
const mongoose  = require('mongoose'); 
// const bcrypt    = require('bcrypt'); 
// const jwt       = require('jsonwebtoken');
const auth= require('../middleware/check-token'); 
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

router.patch('/class/update/:_id', auth,  (req, res, next)=>{
    // const id = req.body._id;
    // const updateOps = {};
    // const input = {
    //     _id: req.body._id,
    //   } 
    // for (const ops of Object.keys(input)) {
    //     updateOps[ops.propName] = ops.value;
    // }
    // Class.updateOne({ _id: id }, { $set: updateOps })
    // .exec()
    // .then(result => {
    //     res.status(200).json({success:true, msg:'Data updated!', data:result});
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({success:false, error:err});
    // }); 
    Class.findByIdAndUpdate(req.params._id,req.body, (err,emp)=>{
    if (err) {
        return res.status(500).send({error: "Problem with Updating the   Employee recored "})
    };
    res.send({success: "Updation successfull"});
    })  
});

module.exports = router;