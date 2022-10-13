const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

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
GenerateOtpSchema.methods.generatejwt = async function() {
    const token = jwt.sign({_id:this._id}, "mynameisinderjeetsharmaandmyageistwentytwo")
    this.tokens = this.tokens.concat({ token:token})
    await this.save()
    //console.log(token)
    return token
}
module.exports = mongoose.model('otplog',GenerateOtpSchema)