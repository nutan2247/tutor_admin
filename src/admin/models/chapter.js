const mongoose = require('mongoose');
const topicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    chapter_title: { type: String, required: false },
    admin_id: { type: Number, required: false },
    subject: { type: String, required: false },
    language: { type: String, required: false },
    total_topics: { type: Number, required: false },
    status: { type: String, required: false },
    added_at: { type: Date, required: false },
    updated_at: { type: Date, required: false },
});
//This is pending for now.
module.exports = mongoose.model('chapters', topicSchema);