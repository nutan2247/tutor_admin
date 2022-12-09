const express = require('express');
const watchlatest = require('../models/watchlatest');
const Subject = require("../admin/models/subject")
const Chapter = require('../admin/models/chapter');
const Topic=require("../admin/models/topic")
const checkToken = require('../admin/middleware/check-token');
const router = express.Router();

// router.post("/watchlatest",checkToken,async(req,res)=>{
//     try{
//         const watch = new watchlatest({
//             class_id:req.body.class_id,
//             video_url:req.body.video_url,
//             status:req.body.status
//         })
//         const result = await watch.save()
//         return res.status(200).json({success:true, data:"data stored"})
//     }catch(err){
//         return res.status(401).json({success:false, msg:err.message})
//     }
// })


router.post("/watchlatest/list",checkToken,async(req,res)=>{
    const {class_id} = req.body
    try{
        const subjectList = await Subject.find({ class_id })
        var resArr = [];
        for (const [_, value] of Object.entries(subjectList)) {
            const latest = await Topic.find({subject_id:value._id,  "upload_video":{"$ne":""}, "status":"active"})
            .select(['chapter_id','topic_name','upload_video', 'upload_pdf'])
            .sort({_id:-1})
            .limit(4);
  
            resArr.push(latest);
        }

        var response = {
            success: true,
            message: 'Watch latest video by class',
            class_id: class_id,
            data: resArr,
        }
        return res.status(200).json(response)
    }catch(err){
        return res.status(401).json({success:false, msg:err.message})
    }
})
module.exports = router