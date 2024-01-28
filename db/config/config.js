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
		dialect: 'postgres',
		pool: {
			min: 0,
			max: 7,
			acquireTimeoutMillis: 1000000,
			createTimeoutMillis: 1000000,
			destroyTimeoutMillis: 5000000,
			idleTimeoutMillis: 3000000,
			reapIntervalMillis: 1000000,
			createRetryIntervalMillis: 2000,
			propagateCreateError: false
		},
		acquireConnectionTimeout: 60000
	}
}
