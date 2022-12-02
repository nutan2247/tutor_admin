const mongoose = require("mongoose")
const chatSchema = mongoose.Schema({
    student_id:{
        type:mongoose.Types.ObjectId,
        ref :'students',
        required:true
    },
    replay_to:{
        type:String,
        required:false
    },
    message:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model("chat",chatSchema)