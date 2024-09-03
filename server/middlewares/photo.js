const path = require('path');
const { 
   v4: uuidv4,
 } = require('uuid');
 
 
exports.uploadPic=(req,res,next)=>{
    
    
    let imgData = req.body.image;// coming from client request
    let base64Data = imgData.split(",")[1];// split with `,`
    let cheminImg='images/'+uuidv4()+"-cv"+req.params.id+".jpeg"
   require("fs").writeFile(cheminImg, base64Data, 'base64', 
    function(data, err) {
       if (err) {
            console.log('err', err);
            return res.status(500).send({
                message: "a problem has occured!"
            });
         }
         else
         {
            console.log(data,"data");
            req.uploadedImg='/'+cheminImg
            next()
         }
       
})

}

exports.uploadPdf=(req,res,next)=>{
    console.log(req);
    console.log(req.files);
   let pdfData = req.files.pdf;// coming from client request
  // let base64Data = pdfData.split(",")[1];// split with `,`
   let cheminPdf='pdfs/'+uuidv4()+"-cv"+req.params.id+".pdf"
   fs.readFile(req.files.pdf.path, (err, data) => {
      fs.writeFile(cheminPdf, data, function (err) {
          if (err) throw err;
          next()
      });
  })
//   require("fs").writeFile(cheminPdf, pdfData,  
//    function(data, err) {
//       if (err) {
//            console.log('err', err);
//            return res.status(500).send({
//                message: "a problem has occured!"
//            });
//         }
//         else
//         {
//            console.log(data,"data");
//            req.uploadedPdf='/'+cheminPdf
//            next()
//         }
      
// })

}
