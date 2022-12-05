const mongoose = require('mongoose');
const topicSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    youtube_video:{
        type:String,
        required:true
    },
    upload_document:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('topic', topicSchema);