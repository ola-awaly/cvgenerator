const cvRepository = require("../repositories/cvs.repository");
const sectionRepository=require("../repositories/sections.repository")

exports.checkRights = async (req, res, next) => {

   
    if(req.loggeduserrole == 'admin')
        next()
    else  
    {
        let cv= await cvRepository.getOne(req.body.CvId)
        if(cv.UserId == req.loggeduserid)
            next()
        else
            return res.status(403).send({
                message: "Forbidden!"
            });
    }
        
   
        
}

exports.checkRightsGetAll = async (req, res, next) => {

   
    if(req.loggeduserrole == 'admin')
        next()
    else if(req.params.id )
    {
        let cv= await cvRepository.getOne(req.params.id)
        if(cv.UserId == req.loggeduserid)
            next()
        else
            return res.status(403).send({
                message: "Forbidden!"
            });
    }
        
    else
    {
        return res.status(403).send({
            message: "Forbidden!"
          });
          
    }
        
}


exports.checkRightsGetOne = async (req, res, next) => {

   
    if(req.loggeduserrole == 'admin')
        next()
    else if(req.params.id )
    {
        let section=await sectionRepository.getOne(req.params.id)
        console.log(section);
        if(section){
            let cv= await cvRepository.getOne(section.CvId)
        if(cv.UserId == req.loggeduserid)
            next()
        else
            return res.status(403).send({
                message: "Forbidden!"
            });
        }
        else{
            return res.status(403).send({
                message: "Forbidden!"
            });
        }
        
    }
        
    else
    {
        return res.status(403).send({
            message: "Forbidden!"
          });
          
    }
        
}