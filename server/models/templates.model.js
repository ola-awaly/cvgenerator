const templateModel = (sequelize, DataTypes) => {
    const Template = sequelize.define("Template", {
        intitule: {
            type: DataTypes.STRING,
            allowNull: false
        },
        configParDefaut : {
            type: DataTypes.STRING,
            allowNull: false
        },
        image : {
            type: DataTypes.STRING,
            allowNull: true
        },
        
    },
    {
        paranoid: true,
        underscored: true
    })

    return Template
}

module.exports = templateModel