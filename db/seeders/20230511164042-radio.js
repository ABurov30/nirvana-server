const RadioBrowser = require('radio-browser')
const { v4: uuidv4 } = require('uuid')
const checkImage = require('../../web/utils/checkImage')

module.exports = {
	async up(queryInterface, Sequelize) {
		const radios = await RadioBrowser.getStations({ limit: 100 })
		const radiosWithUsefullFields = await Promise.all(
			radios.map(async el => {
				return {
					id: uuidv4(),
					name: el.name,
					url: el.url,
					votes: el.votes,
					country: el.country,
					favicon: (await checkImage(el.favicon)) ? el.favicon : '',
					tags: el.tags,
					lastcheckoktime: el.lastcheckoktime,
					void: el.void
				}
			})
		)
		await queryInterface.bulkInsert('Radios', radiosWithUsefullFields, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Radios', null, {})
	}
}
