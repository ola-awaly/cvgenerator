const lienModel = (sequelize, DataTypes) => {
    const Lien = sequelize.define("Lien", {
        lien: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isUrl: {
                    args:true,
                    msg: "lien must be a URL"
                }
            }
            
        },
        commentaire : {
            type: DataTypes.STRING,
            allowNull: false
        },
        ordre : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    },
    {
        paranoid: true,
        underscored: true
    })

    return Lien
}

module.exports = lienModel