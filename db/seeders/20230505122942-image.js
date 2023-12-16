'use strict'
const { createApi } = require('unsplash-js')
const nodeFetch = require('node-fetch')

module.exports = {
	async up(queryInterface, Sequelize) {
		const unsplash = createApi({
			accessKey: 'od9eQ1qEw7FgxE-OaJkWaB-hKxEG0JZX-gK8Lqvc1ac',
			fetch: nodeFetch
		})
		const { response } = await unsplash.search.getPhotos({
			query: 'music',
			page: 3
		})
		const results = response.results.map(img => {
			return {
				alt_description: img.alt_description,
				description: img.description,
				raw: img.urls.raw,
				full: img.urls.full,
				favicon: img.urls.regular,
				small: img.urls.small,
				thumb: img.urls.thumb,
				small_s3: img.urls.small_s3,
				self: img.links.self,
				html: img.links.html,
				download: img.links.download,
				download_location: img.links.download_location,
				likes: img.likes
			}
		})
		const images = results.sort((a, b) => b.likes - a.likes)
		await queryInterface.bulkInsert('Images', images, {})
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Images', null, {})
	}
}
