const bcrypt=require('bcryptjs')

const userModel = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        prenom: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:{
                    args: [3,255],
                    msg: "prenom must be at least 3 caracters"
                }
            }
        },
        nom : {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:{
                    args: [3,255],
                    msg: "nom must be at least 3 caracters"
                }
            }
           
        },
        adresse : {
            type: DataTypes.STRING,
            validate:{
                len:{
                    args: [10,255],
                    msg: "adresse must be at least 10 caracters"
                }
            }
        },
        cp : {
            type: DataTypes.STRING
        },
        ville : {
            type: DataTypes.STRING
        },
        pays : {
            type: DataTypes.STRING
        },
        tel : {
            type: DataTypes.STRING
        },
        mobile : {
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate:{
                isEmail:{
                    args: true,
                    msg: "email must have a valid email format"
                }
            }
            
        },
        dateDeNaissance : {
            type: DataTypes.DATEONLY,
            validate:{
                
                customValidator(value) {
                    //console.log(new Date(value));
                    //console.log(new Date());
                    if (new Date(value) > new Date()) {
                      throw new Error("date must be in the past");
                    }
                }
            }
            
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false,
            
            validate:{
                len: {
                    args:[8,100],
                    msg: 'password must be at least 8'},
                is: {
                    args: ["^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$",'i'], 
                    msg: 'password must contain at least one uppercase, one lowercase and one number'
                 }
            },
            // set(value){
            //     if(value.length < 8)
            //         throw new Error('password mus be at least 8')
            //     else if(! /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(value))
            //         throw new Error('password must contain at least one uppercase, one lowercase and one number')
            //     else
            //         this.setDataValue('password', bcrypt.hashSync(value, 10));
            // }
           
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:'user',
            validate: {
                isIn:{
                         args:[['user', 'admin']],
                         msg:"role must be one of 'user' or 'admin'"
                     } 
            }
            
           
        },
        tokenForgetPassword:{
            type:DataTypes.STRING
        },
        tokenForgetPasswordDate:{
            type: DataTypes.DATE(6)
        }
        
    },
    {
        paranoid: true,
        underscored: true,
        hooks: {
            beforeCreate: async (user) => {
                console.log("beforecreate hook");
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
            ,
            beforeUpdate: async (user) => {
                console.log("beforeupdate hook");
                console.log(user);
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, 'a');
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        }
    })

    return User
}

module.exports = userModel