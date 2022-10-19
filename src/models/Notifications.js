const mongoose = require("mongoose")

const NotificationSchema = mongoose.Schema({
    Title:{
          type:String,
          required:true,
    },
    Description:{
          type:String,
          required:true
    },
    createdAt:{
     type: Date, 
     default: Date.now
    }
})
module.exports = mongoose.model("Notification", NotificationSchema)
   
