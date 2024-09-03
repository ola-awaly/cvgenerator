const path=require("path")
const expressJwt = require('express-jwt');
const jwt = require("jsonwebtoken");
const fs=require("fs")
const userRepository = require("../repositories/users.repository.js");

const RSA_PUBLIC_KEY = fs.readFileSync(path.resolve("config/jwt/public.pem"));
   

exports.checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY
}); 


exports.checkLogged = async (req, res, next) => {
console.log(req);
let token=''
    if(req.headers["authorization"])
     token = req.headers["authorization"].split(' ')[1];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, RSA_PUBLIC_KEY, (err, decoded) => {
    if (err) {
        console.log(err);
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.loggeduserid = decoded.id
    req.loggeduserrole=decoded.role
    console.log("loggeduserid: "+req.loggeduserid);
    console.log("loggeduserrole: "+req.loggeduserrole);
     userRepository.getOne(req.loggeduserid)
        .then((loggeduser)=>{
            //console.log(loggeduser);
            if(loggeduser) 
              next();
            else     // au cas ou l'utilisateur loggé est supprimé entre temps
              return res.status(401).send({
                message: "Unauthorized!"
              });
          })
        
    })
}


exports.checkRights = async (req, res, next) => {

   
    if(req.loggeduserrole == 'admin')
        next()
   else if(req.loggeduserid == req.params.id  ){
       delete req.body.role               // si c'est pas un admin il ne peut pas modifier le role
        next()
   }
        
    else
    {
        return res.status(403).send({
            message: "Forbidden!"
          });
          
    }
        
}

