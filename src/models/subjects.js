const mongoose = require('mongoose')

  //SUBJECT SCHEMA
  const SubjectSchema = mongoose.Schema({
    sub_status:{
      type: Number,
      required: true
    }
    })
   module.exports = mongoose.model('Subjects', SubjectSchema)