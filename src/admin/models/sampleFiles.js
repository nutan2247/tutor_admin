const multer = require('multer')
const path = require('path');


//IMAGE STORAGE
const Storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, "samplefile/")
    },
    filename : function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
    })

const upload = multer({
    storage : Storage,
    fileFilter : function(req, file, callback) {
        if(
            file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "test/pdf"
            
        ){
            callback(null, true)
        } else {
            console.log("only jpg, jpeg, pdf and png file supported!")
            callback (null, false)
        }
    },
    // limits : {
    //     fileSize: 1024 * 1024 * 2
    // }
}).single('upload_document')  //field name where this image/pdf file save in database

module.exports = upload
