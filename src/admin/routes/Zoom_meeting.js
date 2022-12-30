const express = require("express")
const router = express.Router()
const Zoom = require("../models/Zoom_meeting")
const checktoken = require("../middleware/check-token")

//Zoom meeting Create
router.post("/meeting/add", checktoken, async(req,res)=>{
    try{
        const meeting = new Zoom({
            meeting_id:req.body.meeting_id,
            passcode:req.body.passcode,
            class_id:req.body.class_id,
            time:req.body.time
        })
        await meeting.save()
        return res.status(200).json({success:true, data:meeting})
    }catch(err){
        return res.status(401).json({success:false, msg:err.message})
    }
})


//Zoom meeting listing
router.get("/meeting/list", checktoken, async(req,res)=>{
    try{
    const zoom = await Zoom.find()
    return res.status(200).json({success:true, data:zoom})
    }catch(err){
        return res.status(401).json({success:false, err:err.message})
    }
})


//Zoom meeting Update
router.patch("/meeting/update/:_id", checktoken, async(req,res)=>{
    const _id = req.params._id
    try{
        const zoommeet = await Zoom.findByIdAndUpdate(_id, req.body)
        return res.status(200).json({success:true, data:zoommeet})
    }catch(err){
        return res.status(401).json({success:false, err:err.message})
    }
})


//Zoom meeting delete
router.delete("/meeting/delete/:_id", checktoken, async(req,res)=>{
    const _id = req.params._id
    try{
        const ZoomMeeting = await Zoom.findByIdAndDelete(_id)
        return res.status(200).json({success:true, data:ZoomMeeting})
    }catch(err){
        return res.status(401).json({success:false, err:err.message})
    }
})


module.exports = router