'use strict'
const RadioBrowser = require('radio-browser')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Tracks',
			[
				{
					name: 'Praise The Lord (Da Shine) (Durdenhauer Edit)',
					artist: 'Durdenhauer, A$AP ROCKY feat. Skepta',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/Durdenhauer%2C%20A%24AP%20ROCKY%20feat.%20Skepta%20-%20Praise%20The%20Lord%20(Da%20Shine)%20(Durdenhauer%20Edit).mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/Durdenhauer%2C%20A%24AP%20ROCKY%20feat.%20Skepta%20-%20Praise%20The%20Lord%20(Da%20Shine)%20(Durdenhauer%20Edit).jpeg'
				},
				{
					name: 'Berserk',
					artist: 'JEEMBO',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/JEEMBO%20-%20Berserk.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/JEEMBO%20-%20Berserk.jpeg'
				},
				{
					name: 'Show Out',
					artist: 'Kid Cudi, Skepta, Pop Smoke',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/Kid%20Cudi%2C%20Skepta%2C%20Pop%20Smoke%20-%20Show%20Out.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/Stream%20Kid%20Cudi%2C%20Skepta%2C%20Pop%20Smoke%20-%20Show%20Out%20by%20Kid%20Cudi.jpg'
				},
				{
					name: 'SICKO MODE',
					artist: 'Travis Scott',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/Travis%20Scott%20-%20SICKO%20MODE.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/Travis%20Scott%20_%20SICKO_MODE.jpg'
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Tracks', null, {})
	}
}
