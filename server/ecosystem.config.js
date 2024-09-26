module.exports = [
	{
		script: 'app.js',
		name: 'api',
		exec_mode: 'cluster',
		instances: 4,
	},
];
