const mongoose = require('mongoose');
const topicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chap_id: { type: Number, required: false },
    student_board : { type: String, required: true },
    chapter_title : { type: String, required: true },
    class_id : { type: Number, required: true },
    subject_id : { type: Number, required: true },
    topic_id : { type: Number, required: true },
    chapter_description : { type: String, required: true },
    chapter_document : { type: String, required: false },
    chapter_video : { type: String, required: false },
    language_id : { type: String, required: true },
    chapter_status : { type: Number, required: true },
    added_at: { type: Date, required: false },
    updated_at: { type: Date, required: false },
});
//This is pending for now.
module.exports = mongoose.model('topics',topicSchema);