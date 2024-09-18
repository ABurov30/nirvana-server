const { v4: uuidv4 } = require('uuid')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Contacts',

			[
				{
					id: '3b535334-229c-4af0-986d-cff43898bce6',
					name: 'SamantaWhore',
					userId: '103409448222936552320'
				},
				{
					id: '3b535334-229c-4af0-986d-cff43898bce7',
					name: 'AndreyAsshole',
					userId: '110517773571340756458'
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Contacts', null, {})
	}
}
