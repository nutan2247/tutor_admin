const express   = require('express'); 
const Subject      = require('../models/subject'); 
const mongoose  = require('mongoose'); 
// const jwt       = require('jsonwebtoken');
const checkToken= require('../middleware/check-token'); 
const router    = express.Router(); 

// require('dotenv').config(); //get env variables

// **** All List **** //
router.get('/subject/list', checkToken, async (req, res) => { 
    try{
        const result = await Subject.find(); 
        return res.status(200).json({
            status:200,
            count: result.length,
            msg:'Subject List',
            data: result
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});

router.patch('/subject/update/:_id', (req, res, next)=>{
    const id = req.body._id;
    const updateOps = {};
    const input = {
        firstName: req.body._id,
      } 
    for (const ops of Object.keys(input)) {
        updateOps[ops.propName] = ops.value;
    }
    Subject.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });   
});

//Delete a row 
router.delete('/subject/delete/:_id',(req, res, next)=>{
    const id = req.params._id;
    Subject.remove({ _id : id })
    .exec()
    .then( result => {
        console.log(result)
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

module.exports = router;