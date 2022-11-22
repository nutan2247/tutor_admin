const mongoose = require("mongoose")
const chatSchema = mongoose.Schema({
    Image:{
        type:String,
        required:true
    },
    student_name:{
        type:String,
        required:true
    },
    contact_no:{
        type:Number,
        required:true
    },
    no_of_chat:{
        type:Number,
        required:true
    },
    new_chat:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:false
    },
    action:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now(),
        required:true
    }
})
module.exports = mongoose.model("Chat",chatSchema)