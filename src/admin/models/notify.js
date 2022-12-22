const mongoose = require("mongoose")
const NotifySchema = mongoose.Schema({
    notification_title: {type:String, required:true},
            notification_description: {type:String, required:true},
            notification_for: {type:String, required:true},
            sent_on: {type:String, required:true},
            status: {type:String, required:true},
            is_seen: {type:Boolean, default:false},
            createdAt: {type: Date, default: Date.now},
            updatedAt: {type: Date, default: Date.now} 
        
        })
module.exports = mongoose.model("notifi",NotifySchema)