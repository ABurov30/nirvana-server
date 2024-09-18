const { v4: uuidv4 } = require('uuid')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'ChatPerUsers',
			[
				{
					id: uuidv4(),
					chatId: '8a2e3601-291f-4205-9a73-209bf593b8d6',
					userId: '103409448222936552320'
				},
				{
					id: uuidv4(),
					chatId: '31470e3d-0bcd-49d6-afe0-92686ac5e3a2',
					userId: '103409448222936552320'
				},
				{
					id: uuidv4(),
					chatId: 'b86976b6-f664-444a-913a-bd8881252508',
					userId: '103409448222936552320'
				},
				{
					id: uuidv4(),
					chatId: '8a2e3601-291f-4205-9a73-209bf593b8d6',
					userId: '110517773571340756458'
				},
				{
					id: uuidv4(),
					chatId: '31470e3d-0bcd-49d6-afe0-92686ac5e3a2',
					userId: '110517773571340756458'
				},
				{
					id: uuidv4(),
					chatId: 'b86976b6-f664-444a-913a-bd8881252508',
					userId: '110517773571340756458'
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('ChatPerUsers', null, {})
	}
}
