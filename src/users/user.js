require('dotenv').config(); //get env variables

const express = require('express'); 
const User = require('../models/user'); 
const router = express.Router(); 
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');


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


module.exports = router;