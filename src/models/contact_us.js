const mongoose = require("mongoose")
const contactSchema = mongoose.Schema({
    contact_no:{
        type : String,
        required : true
    },
    Email_id : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }
})
module.exports = mongoose.model("settings", contactSchema)