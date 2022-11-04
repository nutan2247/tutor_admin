require('dotenv').config(); //get env variables

const express = require('express'); 
const _ = require('lodash')
const otpGenerator = require('otp-generator')
const User = require('../models/user'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const student = require('../models/userlogin')
const OtpGenerate = require('../models/otpgenerate')
const OtpVerify = require('../models/otpverify')
const subject = require('../models/subjects')
const checktoken = require('../users/usermiddleware/verify_token')
const subStatus = require('../models/class')
const upload = require('../models/uploadimage')
const watchlatest = require('../models/watchlatest')
const Notification = require("../models/Notifications")
const checkBox = require("../models/SubjectCheckbox")
const Setting = require('../models/contact_us');
const admission = require("../models/chapter")




router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
    .exec()
    .then( user => {
        if(user.length < 1){
            return res.status(401).json({
                message: 'User does not exits!'
            });
        }
           
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err){
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }

            if(result){
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                }, 
                process.env.JWT_KEY,
                {
                    expiresIn:"1h"   
                }
                );
                return res.status(200).json({
                    message: 'Auth Successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
       
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.post("/signup",(req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(
        user =>{
            if(user.length >= 1){
                return res.status(409).json({
                    message:"Mail Exists!"
                });
            }else{
                bcrypt.hash(req.body.password, 10, (err, hash) =>{
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    } else{
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            email: req.body.email,
                            password: hash
                            })
                        user
                        .save()
                        .then(result =>{
                            console.log(result);
                            res.status(200).json({
                                message:'User created'
                            });
                        })
                        .catch(err =>{
                            console.log(err);
                            res.status(500).json({
                                error:err
                            }); 
                        })
                    }
               
                });
            }
        }
    )
   
});

router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId})
    .exec()
    .then( result => {
        res.status(200).json({
            message: "user deleted!"
        })
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


router.get('/getData',(req, res)=>{
    res.status(200).json({
        message: 'Express API is working @ port:3000'
    });
});

router.get('/userList',(req, res, next)=>{
    User.find()
    .select('email password _id')
    .exec()
    .then(result => {
        const response = {
            count: result.length,
            users: result.map( result => {
                return {
                    email: result.email,
                    password: result.passwor,
                    _id: result._id
                }
            }
        )}
        // console.log(docs);
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })
    
});


//LOGIN
router.post('/Signin', async(req,res) => { 
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


//OTP GENERATE
router.post('/login_by_otp', async(req,res) =>{
    contact_no = req.body.contact_no
  try{
  const Data = await OtpGenerate.findOne({contact_no})
  if(!Data){ res.status(400).json({success:false, message:'Please Enter a Valid Contact No'}) }
    
  const AutoOTP = otpGenerator.generate(6, {
    digits : true, lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false
  })
  const otp = new OtpVerify({contact_no: contact_no, otp: AutoOTP})
  const salt = await bcrypt.genSalt(10)
  otp.otp = await bcrypt.hash(otp.otp, salt )
   
  const result = otp.save(function(err){
    })
  res.status(200).json({success:true, message:"OTP SEND SUCCESSFULLY " + AutoOTP})
  console.log(AutoOTP)
       
 

}catch(error){
  // res.status(500).json({success:false, error})
      }

})



//VERIFY OTP
router.post('/verify_otp',async(req,res) => {
    const otpHolder = await OtpVerify.find({
        contact_no : req.body.contact_no
       // otp : req.body.otp
  
    })
    if(otpHolder.length === 0)return res.status(400).json({success:false, message:'EXPIRED OTP'})
    const rightthreeFind = otpHolder[otpHolder.length-1]
    const validUser =  bcrypt.compareSync(req.body.otp, rightthreeFind.otp)
    if(rightthreeFind.contact_no === req.body.contact_no && validUser){
     const Data1 = new OtpGenerate(_.pick(req.body,["contact_no"]))
     const user = await student.findOne({contact_no})

     const payload = {
        user: {
          _id: user._id,
          contact_no: user.contact_no,
        
        }
      };
      
    //   console.log(payload);
      jwt.sign(payload,process.env.JWT_KEY,{ expiresIn: '24h' },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ 
                success:true,   
                message:"Login successfully",
                token : token,
             });
        }
      );
                             
    } else {  return res.status(401).send({
        success:false,   
        message:"Your otp was wrong",
        })
    }
    })


  //CLASS AND SUBJECT API IN ONE ROUTE
router.get('/subject_class',checktoken, async(req,res) => {
    try{
        
        const subzect = await subject.find()
        const sub = await subStatus.find()
        const result = {"subject":subzect, "class":sub}
            res.status(200).json({success:true, result})
        
        
    } catch(error) {
        res.status(500).json({ succes: false ,message : error.message})
    }
})


//Update personal details
router.post('/student_update',checktoken, upload, async(req,res)=>{ 
    const Details = {
     student_name : req.body.student_name,
     student_email : req.body.student_email,
     father_name : req.body.father_name,
      roll_on : req.body.roll_on,
      date_of_admission : req.body.date_of_admission,
      contact_no : req.body.contact_no,
      student_photo : req.body.student_photo,
    }
    if(req.file){
    Details.student_photo = req.file.path
    }
    try {       
        const {student_name, student_email, contact_no} = req.body
        if(!student_name || !student_email || !contact_no ) {
            return res.status(400).json({error:'Please Filled The Data'})
        }
        const Data = await student.updateOne({contact_no},{$set:{ 
                        student_name : req.body.student_name,
                        student_email : req.body.student_email,
                        father_name : req.body.father_name,
                        roll_on : req.body.roll_on,
                        date_of_admission : req.body.date_of_admission,
                        student_photo : req.file.path,
         }
        })
        console.log(Details)
        return res.status(200).json({success:true,Data})
    } catch(error) {
         return res.status(500).json({success :false,error})

    }

})


//Student Data Get By ObjectId
router.get('/student_objectid',checktoken,async(req,res)=>{
    const _id = req.body._id
    //const contact_no = req.body.contact_no
    try{
        const stu = await student.find({_id})
        res.status(200).json({success:true, stu})
    }catch(err){
        res.status(401).json({success:false, message:'Please enter a valid ID'})
    }
})


//Watch latest api
router.get('/watch_latest',checktoken, async(req,res) => {
    try{
        const Watch = await watchlatest.find({ status:1})
        res.status(200).json({success:true, Watch})
        
        
} catch(error) {
    res.status(500).json({ succes: false ,message : error.message})

    }
})


  //Subject api
  router.get('/student_subject',checktoken, async(req,res) => {
    try{
        
        const subj = await subject.find()
        res.status(200).json({success:true, subj})
        
        
    } catch(error) {
        res.status(500).json({ succes: false ,message : error.message})
    }
})


// Notifications api
router.get("/notification",checktoken, async(req, res)=>{
    try{
  const Notify = await Notification.find()
  res.status(200).json({success:true, Notify})
    }catch(err){
        res.status(401).json({success:false, message : err.message})
    }
})


//subject checkbox api
router.post("/subject_checkbox",checktoken, async(req, res) =>{
    try{
   const check = new checkBox(req.body)
   const result = await check.save()
   res.status(200).json({success: true, result})
    }catch(err){
        res.status(401).json({success: false, message:err.message})
    }
})
  

//contact us api
router.get("/contact_us",checktoken, async(req, res)=>{
    try {
    const sett = await Setting.find()
    return res.status(200).json({success : true, sett})
    }catch(err){
        return res.status(401).json({success : false, message:err.message})
    }
})


//chapter get api
router.get("/chapter",checktoken, async(req,res)=>{
    const admission_id = req.body.admission_id
    try{
        const Data = await admission.find({admission_id})
        return res.status(200).json({success: true, Data})
    }catch(err){
        return res.status(400).json({success:false, message:err.message})
    }
})

module.exports = router