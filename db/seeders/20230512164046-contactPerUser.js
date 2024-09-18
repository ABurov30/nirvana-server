const { v4: uuidv4 } = require('uuid')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'ContactPerUsers',
			[
				{
					id: uuidv4(),
					contactOwnerId: '103409448222936552320',
					contactId: '3b535334-229c-4af0-986d-cff43898bce7'
				},
				{
					id: uuidv4(),
					contactOwnerId: '110517773571340756458',
					contactId: '3b535334-229c-4af0-986d-cff43898bce6'
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('ContactPerUsers', null, {})
	}
}
