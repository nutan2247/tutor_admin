const mongoose = require('mongoose');
const bannerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ban_id: { type: Number, required: true },
    banner_name: { type: String, required: true },
    banner_posstion: { type: Number, required: true },
    banner_title: { type: Number, required: true },
    banner_description: { type: Number, required: true },
    banner_url: { type: Number, required: true },
    banner_status: { type: Number, required: true }
});

module.exports = mongoose.model('Banner',bannerSchema);