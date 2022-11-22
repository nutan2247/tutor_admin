const mongoose = require("mongoose")
const QuizSchema = mongoose.Schema({
    student_id:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    attempt:{
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
        required:true
    }
})
module.exports = mongoose.model("quizresult",QuizSchema)