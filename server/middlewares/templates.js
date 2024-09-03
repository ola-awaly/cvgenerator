

exports.checkRights = async (req, res, next) => {

   console.log("dans check rights");
    if(req.loggeduserrole == 'admin')
        next()
   
    else
    {
        return res.status(401).send({
            message: "Unauthorized!"
          });
          
    }
        
}