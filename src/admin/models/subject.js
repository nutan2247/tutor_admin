const mongoose = require('mongoose');
const autoincrement = require("mongoose-auto-increment")
const bannerSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    subid: { type: Number },
    subject_name: { type: String, required: true },
    admin_id: { type: Number, required: true },
    sub_status: { type: String, required: true },
    sub_date: { type: Date, required: false },
    department_name: { type: String, required: false }
});

autoincrement.initialize(mongoose.connection)
bannerSchema.plugin(autoincrement.plugin, {
    model: "subjects",
    field: "subid",
    startAt: 1,

})
module.exports = mongoose.model('subjects', bannerSchema);   