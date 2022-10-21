const mongoose = require('mongoose');
const topicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title : { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    note_to: { type: String, required: false },
    note_by: { type: String, required: false }
});
//This is pending for now.
module.exports = mongoose.model('notification',topicSchema);