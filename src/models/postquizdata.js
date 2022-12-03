const mongoose = require("mongoose")
const QuizSchema = mongoose.Schema({
    correct_answer:{
        type:String,
        required:true
    },
    wrong_answer:{
        type:String,
        required:true
    },
    question:{
        type:Array,
        required:true
    }
})
module.exports= mongoose.model("PostQuizData", QuizSchema)