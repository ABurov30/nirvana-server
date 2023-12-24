'use strict'
const RadioBrowser = require('radio-browser')

module.exports = {
	async up(queryInterface, Sequelize) {
		const radios = await RadioBrowser.getStations({ limit: 100 })
		await queryInterface.bulkInsert('Radios', radios, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Radios', null, {})
	}
}
