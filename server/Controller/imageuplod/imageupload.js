
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './public/images');
    },
    filename(req, file, callback) {
        callback(null,file.originalname);
    },
});

const upload = multer({ storage:storage});

const controller = {

    imageUpload :( upload.single('file'), (req, res) => {
        console.log("hey reached");
        try {
            res.json("success")
        } catch (error) {
            res.json(error)
        }
    })



}

module.exports = controller