const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    first_name: { 
        type: String, 
        required: false
    },
    last_name: { 
        type: String, 
        required: false
    },
    password: { 
        type: String, 
        required: false 
    }
});

module.exports = mongoose.model('tbl_user',userSchema);