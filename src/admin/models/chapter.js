const mongoose = require('mongoose');
const chapterSchema = mongoose.Schema({
    class_id: { type: String, required: true },
    subject_id: { type: String, required: true },
    board: { type: String, required: true },
    language: { type: String, required: true },
    chapter_title: { type: String, required: true },
    description: { type: String, required: false },
    status: { type: String, required: true },
    date: { type: Date, default: Date.now() },





    // chapter_title: { type: String, required: true },
    // admin_id: { type: Number, required: true },
    // language: { type: String, required: true },
    // description: { type: String, required: false },
    // total_topics: { type: Number, required: true },
    // topic_id: { type: String, required: true },

    // updated_at: { type: Date, default: Date.now() },
});
module.exports = mongoose.model('chapters', chapterSchema);