const dbc = require("../models/dbc")
const { Op } = require("sequelize") 

const packAndSort = require("../helpers/pack-and-sort")
 
 const db=dbc.get() 
//const packAndSort = require("../helpers/pack-and-sort")


const langueRepository={

    async getAll(sectionid,page=1,limit=10,sortby='ordre-asc'){
        const cond=packAndSort(page,limit,sortby)
        cond.where={section_id:sectionid}
        const langues=await db.Langue.findAndCountAll(cond)
       langues.page=page
        return langues
    },

     getOne(id){

        return db.Langue.findOne({
            where:{
                id: id
            }
        })
    },
    new(langue){
        console.log(langue);
       
        return db.Langue.create(langue)
    },
    update(id,langue){
        return db.Langue.update(langue,{
            where:{
                id:id
            }
        })
    },
    delete(id){
        return db.Langue.destroy({
            where:{
                id:id
            }
        })
    }
   



}




module.exports = langueRepository