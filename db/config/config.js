require('dotenv').config()

module.exports = {
	development: {
		username: 'andreyburov',
		password: null,
		database: 'nirvana',
		host: '127.0.0.1',
		dialect: 'postgres'
	},
	production: {
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: 'postgres'
	}
}
