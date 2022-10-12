const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { type: String, required: true }
});

module.exports = mongoose.model('User',userSchema);



//LOGIN
const TutorSchema =mongoose.Schema({
    student_name : {
      type:String,
      required: true
     },student_email : {
      type:String,
      required: true
     },father_name : {
      type:String,
      required: true
     },roll_on : {
      type:String,
      required: true
     },date_of_admission : {
      type:String,
      required: true
     },contact_no : {
      type:String,
      required: true
     },
     student_photo : {
     type:String,
     required: true
    },
    id : {
      type:String,
      required: true
     }
  })
  
  module.exports = mongoose.model('student', TutorSchema)


  //OTPGENERATE SCHEMA
const GenerateOtpSchema = mongoose.Schema({
    contact_no:{
      type:String,
      required:true
    },
    tokens:[
        {
          token : {
            type:String,
            required:true
          }
        }
      ]
})
module.exports = mongoose.model('contact',GenerateOtpSchema)



//OTPVERIFY SCHEMA
// const VerifyOtpSchema = mongoose.Schema({
//     contact_no: {
//         type:String,
//         required:true
//     },
//     otp: {
//         type: String,
//         required :true

//     },

//     createdAt: {type: Date, default: Date.now, index: {expires: 300} }
    
// })

   

// module.exports =  mongoose.model('OTPSAVE', VerifyOtpSchema)

