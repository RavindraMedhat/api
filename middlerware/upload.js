const path = require("path");
const multer = require("multer");


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

var upload = multer({
    storage: storage,
    // fileFilter: function (req, file, callbak) {
    //     if (
    //         file.mimetype == "image/png" ||
    //         file.mimetype == "image/jpg"
    //     ) {
    //         callbak(null, true)
    //     } else {
    //         console.log("jpg or png olny");
    //         callbak(null, false)

    //     }
    // },
    // limits: {
    //     fieldSize: 1024 * 1024 * 5
    // }
});

module.exports = upload;