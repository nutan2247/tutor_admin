require('dotenv').config(); //get env variables
const express = require("express")
const tutor = express.Router()


const student = require('../models/userlogin')


//LOGIN
tutor.post('/login', async(req,res) => { 
    contact_no = req.body.contact_no
    try{
        
        const data = await student.findOne({contact_no})
        if(!data){ return res.status(500).json({success:false, message:'Please Enter a Valid Contact No'}) }
         res.status(200).json({success:true, data})
        console.log(data)
        
    }catch(error) {
        res.status(500).json({error})
    }
    
})



module.exports = tutor;