const cvModel = require("../models/cv.model");
const cvRepository = require("../repositories/cvs.repository");

exports.checkRights = async (req, res, next) => {

   
    if(req.loggeduserrole == 'admin')
        next()
    else if(req.params.id )
    {
        let cv= await cvRepository.getOne(req.params.id)
        if(cv.UserId == req.loggeduserid)
            next()
        else
            return res.status(403).send({
                message: "Forbidden!!"
            });
    }
        
    else
    {
        return res.status(403).send({
            message: "Forbidden!!"
          });
          
    }
        
}


exports.checkRightsUser = async (req, res, next) => {

   
    if(req.loggeduserrole == 'admin')
        next()
    else if(req.params.id )
    {
        
        if(req.params.id == req.loggeduserid)
            next()
        else
            return res.status(403).send({
                message: "Forbidden!!"
            });
    }
        
    else
    {
        return res.status(403).send({
            message: "Forbidden!!"
          });
          
    }
        
}