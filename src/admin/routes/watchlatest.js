const express = require('express');
const watchlatest = require('../models/watchlatest');
const checkToken = require('../middleware/check-token');
const router = express.Router();

router.post("/watchlatest",checkToken,async(req,res)=>{
    try{
        const watch = new watchlatest({
            class_id:req.body.class_id,
            video_url:req.body.video_url,
            status:req.body.status
        })
        const result = await watch.save()
        return res.status(200).json({success:true, data:"data stored"})
    }catch(err){
        return res.status(401).json({success:false, msg:err.message})
    }
})


router.get("/watchlatest/list",checkToken,async(req,res)=>{
    //const {class_id, status} = req.body
    try{
        const latest = await watchlatest.find({"status":"active"}).sort({_id:-1}).limit(2)
        return res.status(200).json({success:true, data:latest})
    }catch(err){
        return res.status(401).json({success:false, msg:err.message})
    }
})
module.exports = router