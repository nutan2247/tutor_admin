const mongoose = require("mongoose")
const SampleSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    class_for:{
        type:String,
        required:true
    },
    exam_seating:{
        type:String,
        required:true
    },
    starting_time:{
        type:Number,
        required:true
    },
    time_duration:{
        type:Number,
        required:true
    },
    upload_document:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("SamplePaper",SampleSchema)