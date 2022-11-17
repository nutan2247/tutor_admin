const mongoose = require("mongoose")
const paymentLogSchema = mongoose.Schema({
    //_id:mongoose.Types.ObjectId,
    student_name: {
        type: String,
        required: true
    },
    payment_type: {
        type: String,
        required: true
    },
    payment_mode: {
        type: String,
        required: true
    },
    fee_amount: {
        type: Number,
        required: true
    },
    status:{
        type:String,
        required:true
    },
    // student_id:{
    //     type:mongoose.Types.ObjectId
    // },
    createdAt: {type: Date, default: Date.now} ,
    updatedAt: {type: Date, default: Date.now} 

})
module.exports = mongoose.model("paymentLog", paymentLogSchema)