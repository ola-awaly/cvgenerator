const dbc = require("../models/dbc")
 
 const db=dbc.get() 
const { QueryTypes } = require('sequelize');

//quand un id est passé par paramètre, le getOne , l'update et le delete
exports.checkRightsOne = async (req, res, next) => {

    
    if(req.loggeduserrole == 'admin')
        next()
    else if(req.params.id )
    {
        const users = await db.sequelize.query("SELECT users.id FROM experience_professionnelles inner join sections on sections.id=experience_professionnelles.section_id inner join cvs on cvs.id=sections.cv_id inner join users on users.id=cvs.user_id where experience_professionnelles.id="+req.params.id, { type: QueryTypes.SELECT });

        if(users.length){
            if(users[0].id == req.loggeduserid)
            next()
        else
            return res.status(403).send({
                message: "Forbidden!"
            });
        }
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

// l'id de la section est passé par params
exports.checkRightsGetAll = async (req, res, next) => {

   
    if(req.loggeduserrole == 'admin')
        next()
    else if(req.params.id )
    {
        const users = await db.sequelize.query("SELECT users.id FROM  sections  inner join cvs on cvs.id=sections.cv_id inner join users on users.id=cvs.user_id where sections.id="+req.params.id, { type: QueryTypes.SELECT });

        if(users.length){
            if(users[0].id == req.loggeduserid)
        
            next()
        else
            return res.status(403).send({
                message: "Forbidden!"
            });
        }
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

// // post, l'id de la section est dans le body
exports.checkRights = async (req, res, next) => {

   
    if(req.loggeduserrole == 'admin')
        next()
    else if(req.body.SectionId )
    {
        const users = await db.sequelize.query("SELECT users.id FROM  sections  inner join cvs on cvs.id=sections.cv_id inner join users on users.id=cvs.user_id where sections.id="+req.body.SectionId, { type: QueryTypes.SELECT });

        if(users.length){
            if(users && users[0].id == req.loggeduserid)
        
            next()
        else
            return res.status(403).send({
                message: "Forbidden!"
            });
        }
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