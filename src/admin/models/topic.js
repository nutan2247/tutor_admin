const mongoose = require('mongoose');
const topicSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : { type: String, required: true },
    status: { type: Number, required: true },
});
//This is pending for now.
module.exports = mongoose.model('topics',topicSchema);