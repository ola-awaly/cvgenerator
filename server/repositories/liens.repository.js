const dbc = require("../models/dbc")
const { Op } = require("sequelize") 

const packAndSort = require("../helpers/pack-and-sort")
 
 const db=dbc.get() 
//const packAndSort = require("../helpers/pack-and-sort")


const lienRepository={

    async getAll(sectionid,page=1,limit=10,sortby='ordre-asc'){
        const cond=packAndSort(page,limit,sortby)
        cond.where={section_id:sectionid}
        const liens=await db.Lien.findAndCountAll(cond)
       liens.page=page
        return liens
    },

     getOne(id){

        return db.Lien.findOne({
            where:{
                id: id
            }
        })
    },
    new(lien){
        console.log(lien);
       
        return db.Lien.create(lien)
    },
    update(id,lien){
        return db.Lien.update(lien,{
            where:{
                id:id
            }
        })
    },
    delete(id){
        return db.Lien.destroy({
            where:{
                id:id
            }
        })
    }
   



}




module.exports = lienRepository