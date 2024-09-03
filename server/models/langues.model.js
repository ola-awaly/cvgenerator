const langueModel = (sequelize, DataTypes) => {
    const Langue = sequelize.define("Langue", {
        langue: {
            type: DataTypes.STRING,
            allowNull: false
        },
        niveau: {
            type: DataTypes.STRING,
            allowNull: false
        },
        infoSup : {
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

    return Langue
}

module.exports = langueModel