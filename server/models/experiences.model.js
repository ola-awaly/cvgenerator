const experienceModel = (sequelize, DataTypes) => {
    const Experience = sequelize.define("ExperienceProfessionnelle", {
        intituleDePoste: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employeur : {
            type: DataTypes.STRING,
            allowNull: true
        },
        ville : {
            type: DataTypes.STRING,
            allowNull: true
        },
        typeDeContrat : {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateDeDebutMois : {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateDeDebutAnnee : {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateDeFinMois : {
            type: DataTypes.STRING,
            allowNull: true
        },
        dateDeFinAnnee : {
            type: DataTypes.STRING,
            allowNull: false
        },
        enCours : {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true,
            
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

    return Experience
}

module.exports = experienceModel