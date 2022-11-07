const mongoose = require("mongoose")
const questionSetSchema = mongoose.Schema({
    qps_id:{
        type: Number,
        //required: true
    },
    chapter_name:{
        type: String,
        //required: true
    },
    admin_id:{
        type: Number,
        //required: true
    } ,
    subject:{
        type: String,
        //required: true
    } ,
    qps_title:{
        type: String,
        //required: true
    },
    qps_time:{
        type: Number,
        //required: true
    },
    qps_mark:{
        type: Number,
        //required: true
    },
    qps_negative_mark:{
        type: String,
        //required: true
    },
    no_of_ques:{
        type: Number,
        //required: true
    },
    qps_language:{
        type: String,
        //required: true
    },
    ques_ids:{
        type: String,
        //required: true
    },
    qps_date:{
        type: Date,
        //required: true
    },
    solution_video:{
        type: Number,
        //required: true
    },
    solution_pdf:{
        type: String,
        //required: true
    } ,
    qps_status:{
        type: Number,
        //required: true
    }
})
module.exports = mongoose.model("QuestionSet", questionSetSchema)