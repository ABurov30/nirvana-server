const { v4: uuidv4 } = require('uuid')

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'Tracks',
			[
				{
					id: uuidv4(),
					name: 'The Blackest Bouquet',
					artist: 'LeonellCassio',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/leonell-cassio-the-blackest-bouquet-118766.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/19-48-37-847_200x200.webp',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Be and Obey (Deep Abstract Experimental Electronic',
					artist: 'Rockot',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/be-and-obey-deep-abstract-experimental-electronic-173056.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/14-57-47-911_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Biocenosis (Emotional Ethnic Dark Electronic Beats)',
					artist: 'Rockot',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/biocenosis-emotional-ethnic-dark-electronic-beats-173057.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/14-58-18-729_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Action Of Your Dreams',
					artist: 'Rockot',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/action-of-your-dreams-173046.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/14-44-12-90_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Flamin (Energetic Future Bass)',
					artist: 'Music_Unlimited',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/flamin-energetic-future-bass-121568.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/08-45-28-363_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'The Sapphire City',
					artist: 'LeonellCassio',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/leonell-cassio-the-sapphire-city-10450.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/08-10-48-631_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Cyber Kong',
					artist: 'moodmode-studio',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/cyber-kong-167432.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/15-13-16-379_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Red Rabbit - Audiopanther',
					artist: 'igorovsyannykov',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/red-rabbit-audiopanther-115592.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/11-36-36-507_200x200.webp',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Diamond',
					artist: 'Black Scorpion Music',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/black-scorpion-music-diamond-123319.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/23-20-00-675_200x200.webp',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Matrix',
					artist: 'Black Scorpion Music',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/black-scorpion-music-matrix-132549.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/00-04-20-834_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'waltz of small life 150',
					artist: 'Darockart',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/waltz-of-small-life-150-173729.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/06-06-31-752_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Ambient Inspiring Soundscape',
					artist: 'Abydos_Music',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/ambient-inspiring-soundscape-155689.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/06-52-53-241_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Long Ago',
					artist: 'moodmode',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/long-ago-156018.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/17-47-18-731_200x200.webp',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Meditative Background Music Space Travel',
					artist: 'UNIVERSFIELD',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/meditative-background-music-space-travel-153309.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/05-14-13-972_200x200.webp',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Lanark meditative ambiend soundscape for learning and relaxing',
					artist: 'AlanFrijns',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/lanark-meditative-ambiend-soundscape-for-learning-and-relaxing-106812.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/12-42-59-654_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Berwick meditative ambient soundscape for learning and relaxing',
					artist: 'AlanFrijns',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/berwick-meditative-ambient-soundscape-for-learning-and-relaxing-95394.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/12-42-59-654_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Space',
					artist: 'The_Mountain',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/space-158081.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/00-33-33-336_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Healing Sounds',
					artist: 'RelaxingTime',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/healing-sounds-124056.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/16-39-46-691_200x200.webp',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Rain in the paradise forest yoga zen relaxation positive sleep music',
					artist: 'AlanFrijns',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/rain-in-the-paradise-forest-yoga-zen-relaxation-positive-sleep-music-140636.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/19-59-53-918_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'A Walk with God1111',
					artist: 'IamThatIam888',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/a-walk-with-god1111-143838.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/15-58-19-84_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Ambient Space Dream Meditation Background Music',
					artist: 'Music_Unlimited',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/ambient-space-dream-meditation-background-music-149047.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/09-22-51-497_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'The Reflection of My Soul',
					artist: 'JCI21',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/the-reflection-of-my-soul-157608.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/16-21-33-391_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Midnight Groove',
					artist: 'saavane',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/midnight-groove-139641.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/00-56-41-638_200x200.webp',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Autumn Leaves',
					artist: 'LofCosmos',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/autumn-leaves-157898.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/23-26-18-677_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Far Away (Lo-Fi Hip-Hop Background Music)',
					artist: 'Music_Unlimited',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/far-away-lo-fi-hip-hop-background-music-151495.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/07-31-30-378_200x200.jpg',
					moderated: true
				},
				{
					id: uuidv4(),
					name: 'Sakura Meditate Beat',
					artist: 'moodmode',
					url: 'https://storage.yandexcloud.net/nirvana-tracks/mp3/sakura-meditate-beat-138298.mp3',
					favicon:
						'https://storage.yandexcloud.net/nirvana-tracks/img/21-30-36-940_200x200.jpg',
					moderated: true
				}
			],
			{}
		)
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Tracks', null, {})
	}
}
