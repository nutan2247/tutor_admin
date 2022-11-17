const mongoose = require("mongoose")
const quizSchema = mongoose.Schema({
   set:{
    type:mongoose.Types.ObjectId,
    required:true
   },
   question:{
    type:String,
    required:true
   },
   options:{
    type:Array,
    required:true
   }
})
module.exports = mongoose.model("Quiz", quizSchema)