const { v4: uuidv4 } = require('uuid')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Chats',

			[
				{
					id: uuidv4(),
					name: 'andrey burov 1',
					isNewMessage: true
				},
				{
					id: uuidv4(),
					name: 'andrey burov 2',
					isNewMessage: true
				},
				{
					id: uuidv4(),
					name: 'andrey burov 3',
					isNewMessage: false
				},
				{
					id: uuidv4(),
					name: 'andrey burov 4',
					isNewMessage: false
				},
				{
					id: uuidv4(),
					name: 'andrey burov 5',
					isNewMessage: false
				},
				{
					id: '8a2e3601-291f-4205-9a73-209bf593b8d6',
					name: 'andrey burov 6',
					isNewMessage: false
				},
				{
					id: '31470e3d-0bcd-49d6-afe0-92686ac5e3a2',
					name: 'andrey burov 7',
					isNewMessage: false
				},
				{
					id: 'b86976b6-f664-444a-913a-bd8881252508',
					name: 'andrey burov 8',
					isNewMessage: true
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Chats', null, {})
	}
}
