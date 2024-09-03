const dbc = require("../models/dbc")
const { Op } = require("sequelize") 

const packAndSort = require("../helpers/pack-and-sort")
 
 const db=dbc.get() 
//const packAndSort = require("../helpers/pack-and-sort")


const templateRepository={

    async getAll(page=1,limit=10,sortby='id-asc'){
        const cond=packAndSort(page,limit,sortby)
        
        const templates=await db.Template.findAndCountAll(cond)
       templates.page=page
        return templates
    },

     getOne(id){

        return db.Template.findOne({
            where:{
                id: id
            }
        })
    },
    new(template){
        console.log(template);
       
        return db.Template.create(template)
    },
    update(id,template){
        return db.Template.update(template,{
            where:{
                id:id
            }
        })
    },
    delete(id){
        return db.Template.destroy({
            where:{
                id:id
            }
        })
    }
   



}




module.exports = templateRepository