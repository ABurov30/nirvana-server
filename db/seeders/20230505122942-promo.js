const { v4: uuidv4 } = require('uuid')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Promos',
			[
				{
					id: uuidv4(),
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/promo/pexels-ketut-subiyanto-4651046%20(1).jpg'
				},
				{
					id: uuidv4(),
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/promo/pexels-marcelo-chagas-1876279.jpg'
				},
				{
					id: uuidv4(),
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/promo/pexels-martin-lopez-2240772%20(1).jpg'
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Promos', null, {})
	}
}
