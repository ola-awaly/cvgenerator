const cvModel = (sequelize, DataTypes) => {
    const CV = sequelize.define("Cv", {
        label: {
            type: DataTypes.STRING,
            allowNull: false
        },
        intituleDePoste:{
            type: DataTypes.STRING,
            allowNull: false
        },
        prenom: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nom : {
            type: DataTypes.STRING,
            allowNull: false
        },
        adresse : {
            type: DataTypes.STRING,
            allowNull: true
        },
        cp : {
            type: DataTypes.STRING,
            allowNull: true
        },
        ville : {
            type: DataTypes.STRING,
            allowNull: true
        },
        tel : {
            type: DataTypes.STRING,
            allowNull: true
        },
        mobile : {
            type: DataTypes.STRING,
            allowNull: true
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true
        },
        dateDeNaissance : {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        nationalite : {
            type: DataTypes.STRING,
            allowNull: true
        },
        permisDeConduire : {
            type: DataTypes.STRING,
            allowNull: true
        },
        situationFamiliale : {
            type: DataTypes.STRING,
            allowNull: true
        },
        disponibilite : {
            type: DataTypes.STRING,
            allowNull: true
        },
        photo : {
            type: DataTypes.STRING,
            allowNull: true
        },
        customTemplateConfig : {
            type: DataTypes.STRING,
            allowNull: true
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false
        },
        pdf : {
            type: DataTypes.STRING,
            allowNull: true
        }
        
    },
    {
        paranoid: true,
        underscored: true
    })

    return CV
}

module.exports = cvModel