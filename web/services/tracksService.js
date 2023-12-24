const { Track, Sequelize } = require('../../db/models')
const trackMapper = require('../mapper/trackMapper')

async function getTrack(offset, userId) {
	try {
		let results = await Track.findAll({
			limit: 5,
			offset: offset
		})
		results = results.map(result => result.dataValues)
		const res = await trackMapper.toClient(results, 'track', userId)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	getTrack
}
