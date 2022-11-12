require('dotenv').config(); //get env variables

const express   = require('express'); 
const Banner      = require('../models/banner'); 
// const mongoose  = require('mongoose'); 
const auth= require('../middleware/check-token'); 
const router    = express.Router(); 

// **** All List **** //
router.get('/test_api', async (req, res) => {
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

// **** All List **** //
router.get('/banner/list', auth, async (req, res) => {
    try{
        const result = await Banner.find(); 
        return res.status(200).json({
            success:true,
            count: result.length,
            msg:'Banner List',
            data: result
        })
    }
    catch(error){
        res.status(500).json({success:false, message: error.message})
    }
});

router.patch('/banner/update/:_id', auth,  (req, res, next)=>{
    const id = req.body._id;
    const updateOps = {};
    const input = {
        firstName: req.body._id,
      } 
    for (const ops of Object.keys(input)) {
        updateOps[ops.propName] = ops.value;
    }
    Banner.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json({success:true,result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({success:false,error:err});
    });   
});

//Delete a row 
router.delete('/banner/delete/:_id',auth, (req, res, next)=>{
    const id = req.params._id;
    Banner.remove({ _id : id })
    .exec()
    .then( result => {
        console.log(result)
        res.status(200).json({success:true,result});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({success:false,error:err});
    });
});

module.exports = router;