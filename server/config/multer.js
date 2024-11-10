import multer from "multer";
import path from "path";

//image upload multer
const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'tmp')
    // },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const uploads = multer({ storage: storage })

export default uploads;