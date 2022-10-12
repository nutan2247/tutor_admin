require('dotenv').config(); //get env variables

const express   = require('express'); 
const Admin     = require('../models/admin'); 
const Banner    = require('../models/banner'); 
const router    = express.Router(); 
const mongoose  = require('mongoose'); 
const bcrypt    = require('bcrypt'); 
const jwt       = require('jsonwebtoken');
const checkToken= require('../middleware/check-token'); 

// Admin Login & genrate jwt token
router.post('/login2', async (req, res) => {
    try{
        const details = await Admin.findOne({ email: req.body.email});
        // console.log(req.params.email);
        // res.json(details)
        if(details.length <1){
            return res.status(401).json({
                msg:'user not exits'
            })
        }
        // bcrypt.compare(req.body.password,details[0].password,(err,result)=>{
        if(req.body.password != details.password){
            return res.status(401).json({
                msg:'Wrong password!!!'
            })
        }
        if(req.body.password === details.password){

            const token = jwt.sign(
                {
                    'email' : details.email,
                    'id'    : details.id,
                    'first_name': details.first_name,
                    'last_name' : details.last_name
                },
                process.env.JWT_KEY,
                {
                    expiresIn:'24h'
                });

            return res.status(200).json({
                status:200,
                msg:'User Logged In!!!',
                data: { 
                    'email': details.email,
                    'fname': details.first_name,
                    'lname': details.last_name,
                    'token': token,
                }
            })
        }
    } 
    catch(error){
        res.status(500).json({message: error.message, data: error})
    }
});

// Get all banners //
router.get('/bannerList', async (req, res) => {
    try{
        const data = await Banner.find({})
        .select('_id ban_id banner_title banner_posstion banner_description banner_url banner_status'); 
        return res.status(200).json({
            status:200,
            msg:'All Banner List',
            data: data
        })
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
});


// router.post("/signup",(req, res, next) => {
//     Admin.find({ email: req.body.email })
//     .exec()
//     .then(
//         user =>{
//             if(user.length >= 1){
//                 return res.status(409).json({
//                     message:"Mail Exists!"
//                 });
//             }else{
//                 bcrypt.hash(req.body.password, 10, (err, hash) =>{
//                     if(err){
//                         return res.status(500).json({
//                             error: err
//                         });
//                     } else{
//                         const user = new Admin({
//                             _id: new mongoose.Types.ObjectId,
//                             email: req.body.email,
//                             password: hash
//                             })
//                         user
//                         .save()
//                         .then(result =>{
//                             console.log(result);
//                             res.status(200).json({
//                                 message:'Admin created'
//                             });
//                         })
//                         .catch(err =>{
//                             console.log(err);
//                             res.status(500).json({
//                                 error:err
//                             }); 
//                         })
//                     }
               
//                 });
//             }
//         }
//     )
   
// });

// router.delete('/:userId', (req, res, next) => {
//     Admin.remove({ _id: req.params.userId})
//     .exec()
//     .then( result => {
//         res.status(200).json({
//             message: "user deleted!"
//         })
//     })
//     .catch(err =>{
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     });
// });


// router.get('/getData',(req, res)=>{
//     res.status(200).json({
//         message: 'Express API is working @ port:3000'
//     });
// });

// router.get('/userList',(req, res, next)=>{
//     Admin.find()
//     .select('email password _id')
//     .exec()
//     .then(result => {
//         const response = {
//             count: result.length,
//             users: result.map( result => {
//                 return {
//                     email: result.email,
//                     password: result.passwor,
//                     _id: result._id
//                 }
//             }
//         )}
//         // console.log(docs);
//         res.status(200).json(response);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error:err});
//     })
// });



module.exports = router;