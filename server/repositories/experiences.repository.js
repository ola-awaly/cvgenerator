const dbc = require("../models/dbc")
const { Op } = require("sequelize") 

const packAndSort = require("../helpers/pack-and-sort")
 
 const db=dbc.get() 
//const packAndSort = require("../helpers/pack-and-sort")


const experienceRepository={

    async getAll(sectionid,page=1,limit=10,sortby='ordre-asc'){
        const cond=packAndSort(page,limit,sortby)
        cond.where={section_id:sectionid}
        const experiences=await db.Experience.findAndCountAll(cond)
       experiences.page=page
        return experiences
    },

     getOne(id){

        return db.Experience.findOne({
            where:{
                id: id
            }
        })
    },
    new(experience){
        console.log(experience);
       
        return db.Experience.create(experience)
    },
    update(id,experience){
        return db.Experience.update(experience,{
            where:{
                id:id
            }
        })
    },
    delete(id){
        return db.Experience.destroy({
            where:{
                id:id
            }
        })
    }
   



}




module.exports = experienceRepository