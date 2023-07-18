const multer = require('multer');
const { handleUpload } = require('./cloudinary');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
    },
})
const upload = multer({ storage: storage });

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


