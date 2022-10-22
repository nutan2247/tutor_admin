const mongoose = require("mongoose")

const chapterSchema = mongoose.Schema({
    admission_id : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model("chapter", chapterSchema)