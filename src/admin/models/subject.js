const mongoose = require('mongoose');
const bannerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sub_id: { type: Number, unique:true },
    subject_name : { type: String, required: true },
    admin_id: { type: Number, required: true },
    sub_status: { type: String, required: true },
    sub_date: { type: Date, required: false },
    department_name: {type:String, required:false}
});

module.exports = mongoose.model('subjects',bannerSchema);   