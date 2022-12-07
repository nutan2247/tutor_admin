const mongoose = require("mongoose")

const watchSchema = mongoose.Schema({
    class_id:{
        type:String,
        required:true
    },
    video_url : {
        type : String,
        required : true
    },
    status : {
        type : String,
        required : true
    }
    
})
module.exports = mongoose.model("watchlatest", watchSchema)