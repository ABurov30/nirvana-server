const { Track, Sequelize } = require('../../db/models')

async function getTrack(offset) {
	let results = await Track.findAll({
		limit: 5,
		offset: offset
	})
	results = results.map(result => result.dataValues)
	results = results.map(result => {
		return {
			id: result.id,
			name: result.name,
			country: result.artist,
			url: result.url,
			favicon: result.favicon
		}
	})
	return results
}

module.exports = {
	getTrack
}
