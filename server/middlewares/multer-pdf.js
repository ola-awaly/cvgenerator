const multer = require('multer');
const { 
    v4: uuidv4,
  } = require('uuid');
  
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'pdfs');
  },
  filename: (req, file, callback) => {
    let cheminPdf=uuidv4()+"-cv"+req.params.id+".pdf"
    req.uploadedPdf='/pdfs/'+cheminPdf
    callback(null, cheminPdf );
  }
});

const upload = multer({storage: storage}).single('pdf');
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