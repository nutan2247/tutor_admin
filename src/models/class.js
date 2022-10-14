const mongoose = require('mongoose')
//CLASS GENERATE
const ClassSchema = mongoose.Schema({
    status:{
      type: Number,
      required:true
    }
    
    })
    module.exports = mongoose.model('admission_fors', ClassSchema)