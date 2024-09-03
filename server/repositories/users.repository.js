const dbc = require("../models/dbc")
const { Op } = require("sequelize") 
const bcrypt=require('bcryptjs')
const packAndSort = require("../helpers/pack-and-sort")
 
 const db=dbc.get() 
//const packAndSort = require("../helpers/pack-and-sort")


const userRepository={

    async getAll(page=1,limit=10,sortby='id-asc'){
        const cond=packAndSort(page,limit,sortby)
        cond.attributes={ exclude: ['password'] }
        const users=await db.User.findAndCountAll(cond)
        users.page=page
        return users
    },

     getOne(id){

        return db.User.findOne({
            where:{
                id: id
            },
            attributes:{
                exclude: ['password']
            }
        })
    },
    new(user){
        console.log(user);
        if(!user.role) user.role="user"
        //user.password=bcrypt.hashSync(user.password, 10)
        try{
            return db.User.create(user,{
                attributes: { exclude: ['password'] }
            })
        }catch (err) {
         return err
        }

       
    },
    update(id,user){
       // if(user.role) delete user.role
        if(user.password) delete user.password
        return db.User.update(user,{
            where:{
                id:id
            }
        })
    },
    delete(id){
        return db.User.destroy({
            where:{
                id:id
            }
        })
    },
    login(email){
        return db.User.findAll({
            attributes:['id','email','role','nom','prenom','password']
            ,
            where:{
                email:email
            }
        })
    },
    checkEmail(email){

        return db.User.findOne({
            where:{
                email: email
            },
            attributes:{
                exclude: ['password']
            }
        })
    },
    resetPassword(id,user){
        // if(user.role) delete user.role
         //if(user.password) user.password=bcrypt.hashSync(user.password, 10)
         return db.User.update(user,{
             where:{
                 id:id
             },
             individualHooks: true
         })
     },
    setRandomToken(email,token){
        return db.User.update({
            tokenForgetPassword: token,
            tokenForgetPasswordDate: Date()
        },{
            where:{
                email:email
            }
        })

     },
     checkRandomToken(token){
        console.log("dans chek random token repository");
        return db.User.findOne({
            where:{
                tokenForgetPassword: token
            },
            attributes:{
                exclude: ['password']
            }
        })
       
     }
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




module.exports = userRepository