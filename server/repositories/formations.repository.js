const dbc = require("../models/dbc")
const { Op } = require("sequelize") 

const packAndSort = require("../helpers/pack-and-sort")
 
 const db=dbc.get() 
//const packAndSort = require("../helpers/pack-and-sort")


const formationRepository={

    async getAll(sectionid,page=1,limit=10,sortby='ordre-asc'){
        const cond=packAndSort(page,limit,sortby)
        cond.where={section_id:sectionid}
        const formations=await db.Formation.findAndCountAll(cond)
       formations.page=page
        return formations
    },

     getOne(id){

        return db.Formation.findOne({
            where:{
                id: id
            }
        })
    },
    new(formation){
        console.log(formation);
       
        return db.Formation.create(formation)
    },
    update(id,formation){
        return db.Formation.update(formation,{
            where:{
                id:id
            }
        })
    },
    delete(id){
        return db.Formation.destroy({
            where:{
                id:id
            }
        })
    }
   



}




module.exports = formationRepository