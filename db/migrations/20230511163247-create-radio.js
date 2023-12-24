/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Radios', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			changeuuid: {
				type: Sequelize.TEXT
			},
			stationuuid: {
				type: Sequelize.TEXT
			},
			serveruuid: {
				type: Sequelize.TEXT
			},
			name: {
				type: Sequelize.TEXT
			},
			url: {
				type: Sequelize.TEXT
			},
			url_resolved: {
				type: Sequelize.TEXT
			},
			homepage: {
				type: Sequelize.TEXT
			},
			favicon: {
				type: Sequelize.TEXT
			},
			tags: {
				type: Sequelize.TEXT
			},
			country: {
				type: Sequelize.TEXT
			},
			countrycode: {
				type: Sequelize.TEXT
			},
			iso_3166_2: {
				type: Sequelize.TEXT
			},
			state: {
				type: Sequelize.TEXT
			},
			language: {
				type: Sequelize.TEXT
			},
			languagecodes: {
				type: Sequelize.TEXT
			},
			votes: {
				type: Sequelize.INTEGER
			},
			lastchangetime: {
				type: Sequelize.TEXT
			},
			lastchangetime_iso8601: {
				type: Sequelize.TEXT
			},
			codec: {
				type: Sequelize.TEXT
			},
			bitrate: {
				type: Sequelize.INTEGER
			},
			hls: {
				type: Sequelize.INTEGER
			},
			lastcheckok: {
				type: Sequelize.INTEGER
			},
			lastchecktime: {
				type: Sequelize.TEXT
			},
			lastchecktime_iso8601: {
				type: Sequelize.TEXT
			},
			lastcheckoktime: {
				type: Sequelize.TEXT
			},
			lastcheckoktime_iso8601: {
				type: Sequelize.TEXT
			},
			lastlocalchecktime: {
				type: Sequelize.TEXT
			},
			lastlocalchecktime_iso8601: {
				type: Sequelize.TEXT
			},
			clicktimestamp: {
				type: Sequelize.TEXT
			},
			clicktimestamp_iso8601: {
				type: Sequelize.TEXT
			},
			clickcount: {
				type: Sequelize.INTEGER
			},
			clicktrend: {
				type: Sequelize.INTEGER
			},
			ssl_error: {
				type: Sequelize.INTEGER
			},
			geo_lat: {
				type: Sequelize.INTEGER
			},
			geo_long: {
				type: Sequelize.INTEGER
			},
			has_extended_info: {
				type: Sequelize.BOOLEAN
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW')
			}
		})
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Radios')
	}
}
