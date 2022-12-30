const mongoose = require("mongoose")
const zoomSchema = mongoose.Schema({
    meeting_id:{
        type:String,
        required:true
    },
    passcode:{
        type:String,
        required:true
    },
    class_id:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('ZoomMeeting', zoomSchema)