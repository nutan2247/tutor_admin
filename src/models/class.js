const mongoose = require('mongoose')
//CLASS GENERATE
const ClassSchema = mongoose.Schema({
    status:{
      type: Number,
      required:true
    },
    admin_id:{
      type:Number,
      unique:true
    },
    class_Name:{
      type:String,
      required:true
    }
    
    })
    module.exports = mongoose.model('admission_fors', ClassSchema)