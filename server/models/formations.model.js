const formationModel = (sequelize, DataTypes) => {
    const Formation = sequelize.define("Formations", {
        nomEtablissement: {
            type: DataTypes.STRING,
            allowNull: false
        },
        diplome : {
            type: DataTypes.STRING,
            allowNull: true
        },
        domaineEtude : {
            type: DataTypes.STRING,
            allowNull: true
        },
        mention : {
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

    return Formation
}

module.exports = formationModel