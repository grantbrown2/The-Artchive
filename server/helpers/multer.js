const multer = require('multer');
const { handleUpload } = require('./cloudinary');
const path = require("path");

const checkFileType = function (file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (mimeType && extName) {
        return cb(null, true);
    } else {
        cb("Error: Please upload an image file.");
    }
};

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
})
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    } 
});

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
            return reject(result);
            }
            return resolve(result);
        });
    });
}

module.exports.uploadHandler = async (req, res) => {
    try {
        await runMiddleware(req, res, upload.single('filepath'));
        console.log(req.file)
        const cldRes = await handleUpload('./uploads/' + req.file.filename);
        res.json(cldRes);
    } catch (error) {
        console.log(error);
        res.send({
            message: error.message,
        });
    }
};


