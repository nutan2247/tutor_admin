require('dotenv').config(); //get env variables

const express = require('express'); 
const _ = require('lodash')
const otpGenerator = require('otp-generator')
const User = require('../models/user'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const student = require('../models/user')
const OtpGenerate = require('../models/user')
//const OtpVerify = require('../models/user')

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
        
        const a2 = await student.findOne({contact_no})
        if(!a2){ return res.status(500).json({success:false, message:'Please Enter a Valid Contact No'}) }
         res.status(200).json({success:true, a2})
        console.log(a2)
        
    }catch(error) {
        res.status(500).json({error})
    }
    
})


//OTP GENERATE
router.post('/otp', async(req,res) =>{
    contact_no = req.body.contact_no
  try{
  const Data = await OtpGenerate.findOne({contact_no})
  if(!Data){ res.status(400).json({success:false, message:'Please Enter a Valid Contact No'}) }
    res.status(200).json({success:true, message:"OTP SEND SUCCESSFULLY"})
  const OTP = otpGenerator.generate(6, {
    digits : true, lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false
  })
  console.log(OTP)
       
  const otp = new OtpVerify({contact_no: contact_no, otp:OTP})
  const salt = await bcrypt.genSalt(10)
  otp.otp = await bcrypt.hash(otp.otp, salt )
   
  const result = otp.save(function(err){
})

}catch(error){
  // res.status(500).json({success:false, error})
      }

})



//VERIFY OTP
// router.post('/verify-Otp',async(req,res) => {
//     const otpHolder = await OtpVerify.findOne({
//       contact_no: req.body.contact_no,
//       //otp:req.body.otp
  
//     })
//     if(otpHolder.length === 0)return res.status(400).json({success:false, message:'EXPIRED OTP'})
//     const rightthreeFind = otpHolder[otpHolder.length-1]
//     const validUser =  bcrypt.compare(req.body.otp, rightthreeFind.otp )
//     if(rightthreeFind.contact_no === req.body.contact_no && validUser){   
//      const user = new OtpGenerate(_.pick(req.body,["contact_no"]))
//      //const token = await user.generateAuthToken()
//       //console.log(token)
//                 const result = await user.save()
//                 if(result.err){ return res.status(401).send({
//                     success:false,
//                     errors:"Your Otp Was Wrong"})
//                     }else{ return res.status(200).json({
//                             success:true,   
//                             message:"Login successfully",
//                             //token : token,
//                              data:result 
//                              })}
//    }else {  return res.status(401).send({
//     success:false,   
//     message:"Your otp was wrong",
//      })}
//   })



module.exports = router;