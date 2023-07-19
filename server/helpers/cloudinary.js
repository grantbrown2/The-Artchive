const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    resource_type: "auto",
};

module.exports.handleUpload = async (file) => {
    try {
        const res = cloudinary.uploader.upload(file, options);
        console.log(res);
        return res;
    } catch (error) {
        console.error(error);
    }
};
