const multer = require('multer')
const path = require('path');


//IMAGE STORAGE
const Storage = multer.diskStorage({
    destination : function(req, file, cb) {
        cb(null, "Images/topicdocument/")
    },
    filename : function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
    })

const upload1 = multer({
    storage : Storage,
    fileFilter : function(req, file, cb) {
        switch (file.mimetype) {
           
            case 'application/pdf':
                 cb(null, './topicdocument/');
                 break;
            default:
                 cb('only pdf file supported!');
                 break;
       }
    },
    // limits : {
    //     fileSize: 1024 * 1024 * 2
    // }
}).single('upload_pdf')  //field name where this image/pdf file save in database

module.exports = upload1
