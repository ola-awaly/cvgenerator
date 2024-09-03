const dbc = require("../models/dbc")
const { Op,QueryTypes } = require("sequelize") 

const packAndSort = require("../helpers/pack-and-sort")
 
 const db=dbc.get() 
//const packAndSort = require("../helpers/pack-and-sort")


const cvRepository={

    async getAll(page=1,limit=20,sortby='id-asc'){
        const cond=packAndSort(page,limit,sortby)
        
        const cvs=await db.CV.findAndCountAll(cond)
        cvs.page=page
        return cvs
    },

     getOne(id){

        return db.CV.findOne({
            where:{
                id: id
            }
        })
    },
    async getFullOne(id){
        
       
        return fullcv
    },
    new(cv){
        console.log(cv);
       
        return db.CV.create(cv)
    },
    update(id,cv){
        if(cv.photo) delete cv.photo
        return db.CV.update(cv,{
            where:{
                id:id
            }
        })
    },
    delete(id){
        return db.CV.destroy({
            where:{
                id:id
            }
        })
    },
    setPhoto(id,url){
        return db.CV.update({photo:url},{
            where:{
                id:id
            }
        })
    },
    setPdf(id,url){
        return db.CV.update({pdf:url},{
            where:{
                id:id
            }
        })
    },
    async getByUserId(userid,page=1,limit=100,sortby='id-asc'){
        const cond=packAndSort(page,limit,sortby)
        cond.where={
            user_id:userid
        }
        const cvs=await db.CV.findAndCountAll(cond)
        cvs.page=page
        return cvs
    },
    async duplicate(id){
         let cv=await db.CV.findOne({
            where:{
                id:id
            }
        })
       console.log(cv);
       if(cv)
       {
        cv=cv.toJSON()
        if(cv.id) {
            
            delete cv.id
            delete cv.createdAt
            delete cv.updatedAt
        }
        let cvdup=await db.CV.create(cv)
        cvdup=cvdup.toJSON()
         let sections=await db.Section.findAll({where:{CvId:id}})
        //console.log(sections);
        sections.forEach(async el=> {

            el=el.toJSON()
            //copier les sections
            let sectionEnCours=await db.Section.findByPk(el.id)
            
            //console.log(sectionEnCours);
            delete el.id
            delete el.createdAt
            delete el.updatedAt
            // console.warn(el);
              el.CvId=cvdup.id
              let sectioncree = await db.Section.create(el)
              sectioncree=sectioncree.toJSON()
             console.log(sectioncree);

            if(sectionEnCours.type == 'formation')
            {
                console.log('type===================formation');
                 formations=await sectionEnCours.getFormations()
            formations=formations.map(async form=>{
                form=form.toJSON()
                delete form.id
                delete form.createdAt
                delete form.updatedAt
                 form.SectionId=sectioncree.id
                formcree=await db.Formation.create(form)
               // await sectioncree.addFormation(formcree.toJSON())
                
            })
           
            
             }
            if(sectionEnCours.type == 'experience')
            {
                console.log('type===================experience');
                experiences=await sectionEnCours.getExperienceProfessionnelles()
                experiences=experiences.map(async form=>{
                form=form.toJSON()
                delete form.id
                delete form.createdAt
                delete form.updatedAt
                form.SectionId=sectioncree.id
                expcree=await db.Experience.create(form)
                // await expcree.setSection(sectioncree)   
                //await sectioncree.addExperience(formcree)
                
                 })
           
            
            }

            if(sectionEnCours.type == 'langue')
            {
                console.log('type===================langue');
                langues=await sectionEnCours.getLangues()
                langues=langues.map(async form=>{
                form=form.toJSON()
                delete form.id
                delete form.createdAt
                delete form.updatedAt
                form.SectionId=sectioncree.id
                languecree=await db.Langue.create(form)
                 //await languecree.setSection(sectioncree)   
               // await sectioncree.addLangue(languecree)
                
                 })
           
            
            }

            if(sectionEnCours.type == 'lien')
            {
                console.log('type===================lien');
                liens=await sectionEnCours.getLiens()
                liens=liens.map(async form=>{
                form=form.toJSON()
                delete form.id
                delete form.createdAt
                delete form.updatedAt
                form.SectionId=sectioncree.id
                liencree=await db.Lien.create(form)
                // await liencree.setSection(sectioncree)   
                //await sectioncree.addLangue(languecree)
                
                 })
           
            
            }
           
           
            
           
        })
        return cvdup;
       }
       
       
    },
    // async search(value,page=1,limit=10,sortby='id-asc'){
    //     const cond=packAndSort(page,limit,sortby)
    //     cond.attributes={ exclude: ['password'] }
        
    //     cond.where={
    //         [Op.or]:{
    //             lastname:{
    //                 [Op.like]: '%'+value+'%'
    //             },
    //             firstname:{
    //                 [Op.like]: '%'+value + '%'
    //             }
    //          }
    //     }
    //     const users=await db.User.findAndCountAll(cond)
    //     users.page=page
    //     return users;
    // }



}




module.exports = cvRepository