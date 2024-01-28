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
			acquireTimeoutMillis: 100000000,
			createTimeoutMillis: 1000000000,
			destroyTimeoutMillis: 500000000,
			idleTimeoutMillis: 300000000,
			reapIntervalMillis: 100000000,
			createRetryIntervalMillis: 2000,
			propagateCreateError: false
		},
		acquireConnectionTimeout: 600000000
	}
}
