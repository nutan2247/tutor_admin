require('dotenv').config(); //get env variables

const express   = require('express'); 
const Class      = require('../models/class'); 
const mongoose  = require('mongoose'); 
const bcrypt    = require('bcrypt'); 
const jwt       = require('jsonwebtoken');
const router    = express.Router(); 

// **** All List **** //
router.get('/allClass', async (req, res) => {
    try{
        const data = await Class.find(); 
        return res.status(200).json({
            status:200,
            msg:'All Class List',
            data: data
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

// ** Add ** //
router.post('/addClass', async (req, res) => {
    try{
        const data = new Class({
            _id: new mongoose.Types.ObjectId,
            admin_id: req.body.admin_id,
            admission_name: req.body.admission_name,
            status: 1
            })
        data
        .save()
        .then(result =>{
            console.log(result);
            res.status(200).json({
                message:'data stored!'
            });
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;