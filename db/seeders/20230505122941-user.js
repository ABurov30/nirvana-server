const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					id: uuidv4(),
					email: 'aaa@a',
					nickname: 'aaa',
					hashpass: `${await bcrypt.hash('123', 10)}`,
					confirmed: true
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {})
	}
}
