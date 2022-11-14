const mongoose = require("mongoose")
const studentSchema = mongoose.Schema({
    std_id: {
        type: Number,
        required: true
    },
    btcsess_id: {
        type: Number,
        required: true
    },
    student_email: {
        type: String,
        required: true
    },
    student_password: {
        type: String,
        required: true
    },
    student_name: {
        type: String,
        required: true
    },
    father_name: {
        type: String,
        required: true
    },
    mother_name: {
        type: String,
        required: true
    },
    contact_guardian_no: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    contact_no: {
        type: Number,
        required: true
    },
    date_of_adminssion: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    batch_id: {
        type: Number,
        required: true
    },
    admin_id: {
        type: Number,
        required: true
    },
    department_id: {
        type: Number,
        required: true
    },
    student_board: {
        type: String,
        required: true
    },
    sit_no: {
        type: Number,
        required: true
    },
    roll_on: {
        type: Number,
        required: true
    },
    exam_section: {
        type: String,
        required: true
    },
    student_photo: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    signuptnc: {
        type: Number,
        required: true
    },
    student_status: {
        type: String,
        required: true
    },
    added_at: {
        type: Date,
        required: true
    },
    modified_at: {
        type: Date,
        required: true
    },
    login_status: {
        type: Number,
        required: true
    },
    login_session_id: {
        type: String,
        required: true
    },

})
module.exports = mongoose.model("Student", studentSchema)