const { Favorite, Radio, Track } = require('../../db/models')
const { v4: uuidv4 } = require('uuid')

async function add(trackId, userId, type) {
	try {
		if (type === 'radio') {
			await Favorite.create({
				id: uuidv4(),
				radioId: trackId,
				userId: userId,
				type: type
			})
		} else if (type === 'track') {
			await Favorite.create({
				id: uuidv4(),
				trackId: trackId,
				userId: userId,
				type: type
			})
		} else {
			throw Error('Invalid type')
		}
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function findAll(offset, userId, type) {
	try {
		if (type === 'radio') {
			const stations = await Favorite.findAll({
				where: { type, userId },
				include: {
					model: Radio
				},
				limit: 5,
				offset: offset
			})
			const result = stations.map(station => station.Radio.dataValues)
			return result
		} else if (type === 'track') {
			const tracks = await Favorite.findAll({
				where: { type, userId },
				include: {
					model: Track
				},
				limit: 5,
				offset: offset
			})
			const result = tracks.map(track => track.Track.dataValues)
			return result
		} else {
			throw Error('Invalid type')
		}
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function remove(id, userId, type) {
	try {
		if (type === 'radio') {
			await Favorite.destroy({
				where: { radioId: id, userId: userId }
			})
		} else if (type === 'track') {
			await Favorite.destroy({
				where: { trackId: id, userId: userId }
			})
		} else {
			throw Error('Invalid type')
		}
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function checkIsLiked({ type, userId }) {
	try {
		const res = await Favorite.findAll({
			where: { type, userId },
			attributes: [type === 'track' ? 'trackId' : 'radioId']
		})
		const result = res.map(favorite => favorite.dataValues.trackId)
		return new Set(result)
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	add,
	remove,
	checkIsLiked,
	findAll
}
