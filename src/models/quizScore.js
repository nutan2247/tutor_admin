const mongoose = require("mongoose")
const scoreSchema = mongoose.Schema({
        subject:{
            type:String,
            required:true
        },
        position:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:Date.now()
        },
        duration:{
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
        }
})
module.exports = mongoose.model("quizScore",scoreSchema)