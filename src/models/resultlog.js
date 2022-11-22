const mongoose = require("mongoose")
const resultSchema = mongoose.Schema({
    student_id:{
        type:String,
        required:true
    },
    admin_id:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    ques_no:{
        type:Number,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    correct_ans:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Resultlog",resultSchema)