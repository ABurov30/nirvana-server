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
					hashpass: `${await bcrypt.hash(
						process.env.ADMIN_PASSWORD,
						10
					)}`,
					confirmed: true,
					isAdmin: true
				},
				{
					id: '110517773571340756458',
					email: 'iamandreyburov@mail.ru',
					nickname: 'Andrey',
					hashpass: `${await bcrypt.hash(
						process.env.ADMIN_PASSWORD,
						10
					)}`,
					confirmed: true,
					isAdmin: true
				},
				{
					id: '103409448222936552320',
					email: 'samantaharis6@gmail.com',
					nickname: 'Samanta',
					hashpass: `${await bcrypt.hash(
						process.env.ADMIN_PASSWORD,
						10
					)}`,
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
