s'use strict'
const RadioBrowser = require('radio-browser')

module.exports = {
	async up(queryInterface, Sequelize) {
		const stations = await RadioBrowser.getStations({ limit: 100 })
		await queryInterface.bulkInsert('Stations', stations, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Stations', null, {})
	}
}
