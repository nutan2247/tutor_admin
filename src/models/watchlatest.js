const mongoose = require("mongoose")

const watchSchema = mongoose.Schema({
    Url : {
        type : String,
        required : true
    },
    Topic : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
    
})
module.exports = mongoose.model("watchlatest", watchSchema)