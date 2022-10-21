const mongoose = require('mongoose');
const bannerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sub_id: { type: Number, required: false },
    sub_name : { type: String, required: true },
    department_id: { type: String, required: true },
    sub_status: { type: Number, required: true },
    sub_date: { type: Date, required: false }
});

module.exports = mongoose.model('subject',bannerSchema);