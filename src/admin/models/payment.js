const mongoose =require("mongoose")
const paymentSchema = mongoose.Schema({
    student_name:{
        type:String,
        required:true
    },
    student_contact:{
        type:Number,
        required:true
    },
    received_fee:{
        type:Number,
        required:true
    },
    payment_type:{
        type:String,
        required:true
    },
    payment_mode:{
        type:String,
        required:true
    },
    payment_history:{
        type:String,
        required:true
    },
    action:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model("payment",paymentSchema)