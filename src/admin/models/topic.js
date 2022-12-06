const mongoose = require('mongoose');
const topicSchema = mongoose.Schema({
   chapter_id:{
    type:String,
    required:true
   },
   subject_id:{
    type:String,
    required:true
   },
   upload_video:{
    type:String,
    required:false
   },
   upload_pdf:{
    type:String,
    required:true
   },
   status:{
    type:String,
    required:true
   },
   date:{
    type:Date,
    default:Date.now()
   }
});

module.exports = mongoose.model('topic', topicSchema);