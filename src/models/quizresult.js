const mongoose = require("mongoose")
const QuizSchema = mongoose.Schema({
    student_id:{
        type:String,
        required:true
    },
    qset:{ //Question set objectid
        type:String,
        required:true
    },
    class_id:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    total_question:{
        type:Number,
        required:true
    },
    correct:{
        type:Number,
        required:true
    },
    wrong:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        required:false
    }
})
module.exports = mongoose.model("quizresult",QuizSchema)