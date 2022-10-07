require('dotenv').config(); //get env variables

const express   = require('express'); 
const Class      = require('../models/class'); 
const mongoose  = require('mongoose'); 
const bcrypt    = require('bcrypt'); 
const jwt       = require('jsonwebtoken');
const checkToken= require('../middleware/check-token'); 
const router    = express.Router(); 

// **** All List **** //
router.get('/allClass',checkToken, async (req, res) => {
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

// const express = require('express'); 
// const router = express.Router(); 
// const Product = require('../models/product'); 
// const mongoose = require('mongoose'); 
// const checkAuth = require('../middleware/check-auth'); 

// router.get('/',(req, res, next)=>{
//     Product.find()
//     .select('name price _id')
//     .exec()
//     .then(docs => {
//         const response = {
//             count: docs.length,
//             products: docs.map( doc => {
//                 return {
//                     name: doc.name,
//                     price: doc.price,
//                     _id: doc._id,
//                     request: {
//                         type: 'GET',
//                         url: 'http://localhost/:3000/products/' +doc._id
//                     }
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

// router.post('/', checkAuth, (req, res, next)=>{
//     // const product = {
//     //     name: req.body.name,
//     //     price: req.body.price
//     // }
//     const product = new Product({
//         _id:new mongoose.Types.ObjectId(),
//         name:req.body.name,
//         price:req.body.price,
//     });
//     product.save().then(result =>{
//         console.log(result)
//         res.status(201).json({
//             message: 'Product added successfully',
//             createdProduct: product
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error:err});
//     });
// });

// router.get('/:productId',(req, res, next)=>{
//     const id = req.params.productId;
    
//     // if(id==='special'){
//     //     res.status(200).json({
//     //         message: 'You found special ID',
//     //         id : id
//     //     });
//     // }else{
//     //     res.status(200).json({
//     //         message: 'You found',
//     //         id : id
//     //     });
//     // } 

//     Product.findById(id)
//     .exec()
//     .then( doc => {
//         console.log('form database '+doc)

//         if(doc){
//             res.status(200).json(doc);
//         }else{
//             res.status(404).json({ message : 'No valid entry found for provided id' });
//         }
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error:err});
//     });
// });

// router.patch('/:productId',  checkAuth,(req, res, next)=>{
//     const id = req.params.productId;
//     const updateOps = {};
//     for(const ops of req.body){
//         updateOps[ops.propName] = ops.value;
//     }
//     Product.updateOne({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//         res.status(200).json(result);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error:err});
//     });
   
// });

// router.delete('/:productId',(req, res, next)=>{
//     const id = req.params.productId;
//     Product.remove({ _id : id })
//     .exec()
//     .then( result => {
//         console.log(result)
//         res.status(200).json(result);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error:err});
//     });
// });

module.exports = router;