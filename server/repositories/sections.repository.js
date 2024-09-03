const dbc = require("../models/dbc")
const { Op } = require("sequelize") 

const packAndSort = require("../helpers/pack-and-sort")
 
 const db=dbc.get() 
//const packAndSort = require("../helpers/pack-and-sort")


const sectionRepository={

    async getAll(cvid,page=1,limit=20,sortby='ordre-asc',type='',position=''){
        const cond=packAndSort(page,limit,sortby)
        cond.where={cv_id:cvid}
        if(type)
            cond.where={...cond.where,type:type}
            if(position)
            {
                cond.where={...cond.where,position:position}
                cond.include=[db.Formation,db.Experience,db.Lien,db.Langue]
                
            }
        const sections=await db.Section.findAndCountAll(cond)
       sections.page=page
        return sections
    },
    

     getOne(id){

        return db.Section.findOne({
            where:{
                id: id
            }
        })
    },
    new(section){
        console.log(section);
       
        return db.Section.create(section)
    },
    update(id,section){
        return db.Section.update(section,{
            where:{
                id:id
            }
        })
    },
    delete(id){
        return db.Section.destroy({
            where:{
                id:id
            }
        })
    },

   async getByPosition(cvid,page=1,limit=10,sortby='ordre-asc',position=''){
        const cond=packAndSort(page,limit,sortby)
        cond.where={cv_id:cvid}
        if(position)
        {
            cond.where={...cond.where,position:position}
            cond.include=db.Formation
            

        }
           
        const sections=await db.Section.findAndCountAll(cond)
       sections.page=page
        return sections
    },



}




module.exports = sectionRepository