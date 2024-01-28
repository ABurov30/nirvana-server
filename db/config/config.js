require('dotenv').config()

module.exports = {
	development: {
		username: 'andreyburov',
		password: null,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: 'postgres'
	},
	test: {
		username: process.env.DB_USERNAME,
		password: null,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: 'postgres'
	},
	production: {
		username: process.env.DB_USERNAME,
		password: null,
		database: process.env.DB_DATABASE,
		host: process.env.DB_HOST,
		dialect: 'postgres'
	}
}
