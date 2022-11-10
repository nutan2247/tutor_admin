const mongoose = require('mongoose');
const classSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    admin_id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    class_name: { 
        type: String, 
        required: true
    },
    status: { 
        type: String,
        required: true
    }
});

module.exports = mongoose.model('classe',classSchema);