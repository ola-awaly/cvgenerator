const sectionModel = (sequelize, DataTypes) => {
    const Section = sequelize.define("Section", {
        intitule: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type : {
            type: DataTypes.STRING,
            allowNull: false,
            isIn: [['divers', 'formation','competence','lien','experience','langue']]
        },
        position : {
            type: DataTypes.STRING,
            allowNull: false,
            isIn: [['gauche', 'droit']]
        },
        ordre : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    },
    {
        paranoid: true,
        underscored: true,
        indexes: [
            {
              unique: true,
              fields: ["id","type"]
            }
          ] 
    })

    return Section
}

module.exports = sectionModel