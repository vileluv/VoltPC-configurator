const multer = require("multer");
const path = require("path");
const v4 = require("uuid");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "filestorage/");
    },
    filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${v4()}${ext}`;
        callback(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (extName) {
            return callback(null, true);
        }
        callback(new Error("Только .jpeg, .jpg, .png файлы!"));
    },
});
module.exports = upload;
