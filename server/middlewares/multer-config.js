const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const upload = multer({storage: storage}).single('image');
module.exports= (req, res,next)=> {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.log(err);
        return res.status(400).send({
            message: "wrong name file!"
        });
      } else if (err) {
        // An unknown error occurred when uploading.
        console.log(err);
        return res.status(400).send({
            message: "Bad request!"
        });
      }
  
      // Everything went fine.
      next()
    })
  }