const mongoose = require("mongoose")
const QuestionListSchema = mongoose.Schema({
    questionText:{
        type:String,
        required:true
    },
    setid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }, 
    explations:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = mongoose.model("Question",QuestionListSchema)