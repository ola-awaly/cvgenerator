require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
//attention
const userModel = require('./users.model');
const cvModel = require('./cv.model');
const templateModel = require('./templates.model');
const sectionModel = require('./sections.model');
const langueModel = require('./langues.model');
const lienModel = require('./liens.model');
const experienceModel = require('./experiences.model');
const formationModel = require('./formations.model');
let dbConnector;
console.log(
	'NAME_DB:' +
		process.env.NAME_DB +
		'USER_DB:' +
		process.env.USER_DB +
		'PASSWORD_DB:' +
		process.env.PASSWORD_DB +
		'HOST_DB:' +
		process.env.HOST_DB +
		'PORT_DB' +
		process.env.PORT_DB
);

module.exports = {
	connect: () => {
		if (!dbConnector) {
			const sequelize = new Sequelize(
				process.env.NAME_DB,
				process.env.USER_DB,
				process.env.PASSWORD_DB,
				{
					host: process.env.HOST_DB,
					port: process.env.PORT_DB,
					dialect: 'mysql',
				}
			);

			dbConnector = {
				Sequelize: Sequelize,
				sequelize: sequelize,
				User: userModel(sequelize, DataTypes),
				CV: cvModel(sequelize, DataTypes),
				Template: templateModel(sequelize, DataTypes),
				Section: sectionModel(sequelize, DataTypes),
				Langue: langueModel(sequelize, DataTypes),
				Lien: lienModel(sequelize, DataTypes),
				Experience: experienceModel(sequelize, DataTypes),
				Formation: formationModel(sequelize, DataTypes),
			};
			require('./relations');
			console.log('dbconnector test');
			//console.log(dbConnector);
		}
	},

	get: () => {
		if (!dbConnector) {
			this.connect;

			console.log('connected');
		} else {
			console.log('returndbconnector');
			return dbConnector;
		}
	},
};
