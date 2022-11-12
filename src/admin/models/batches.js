const mongoose = require("mongoose")
const BatchSchema = mongoose.Schema({
    board:{
        type:String,
        required:true
    },
    admission_for:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    batch_time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("Batche",BatchSchema)