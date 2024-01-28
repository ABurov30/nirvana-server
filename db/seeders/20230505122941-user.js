const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt')
require('dotenv').config()

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					id: uuidv4(),
					email: 'admin@nirvana',
					nickname: 'admin',
					hashpass: `${await bcrypt.hash(123, 10)}`,
					confirmed: true,
					isAdmin: true
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Users', null, {})
	}
}
