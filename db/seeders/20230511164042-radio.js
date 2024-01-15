const RadioBrowser = require('radio-browser')
const { v4: uuidv4 } = require('uuid')

module.exports = {
	async up(queryInterface, Sequelize) {
		const radios = await RadioBrowser.getStations()
		const radiosWithUsefullFields = radios.map(el => {
			return {
				id: uuidv4(),
				name: el.name,
				url: el.url,
				votes: el.votes,
				country: el.country,
				favicon: el.favicon,
				tags: el.tags,
				lastcheckoktime: el.lastcheckoktime,
				void: el.void
			}
		})
		await queryInterface.bulkInsert('Radios', radiosWithUsefullFields, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Radios', null, {})
	}
}
