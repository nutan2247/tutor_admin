const mongoose = require('mongoose');
const bannerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sub_id: { type: Number, required: true },
    sub_name : { type: String, required: true },
    department_id: { type: Number, required: true },
    sub_status: { type: Number, required: true },
    sub_date: { type: Number, required: true }
});

module.exports = mongoose.model('Subject',bannerSchema);