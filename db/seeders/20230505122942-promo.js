'use strict'
const { createApi } = require('unsplash-js')
const nodeFetch = require('node-fetch')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Promos',
			[
				{
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/promo/pexels-ketut-subiyanto-4651046%20(1).jpg'
				},
				{
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/promo/pexels-marcelo-chagas-1876279.jpg'
				},
				{
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
