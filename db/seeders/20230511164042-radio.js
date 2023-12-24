const RadioBrowser = require('radio-browser')
const { v4: uuidv4 } = require('uuid')

module.exports = {
	async up(queryInterface, Sequelize) {
		const radios = await RadioBrowser.getStations({ limit: 100 })
		const radiosWithId = radios.map(el => (el.id = uuidv4()))
		await queryInterface.bulkInsert('Radios', radios, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Radios', null, {})
	}
}
