const { ids } = require('webpack')
const { Favorite, Sequelize } = require('../../db/models')
const { v4: uuidv4 } = require('uuid')

async function add(trackId, userId, type) {
	try {
		if (type === 'radio') {
			const res = await Favorite.create({
				id: uuidv4(),
				radioId: trackId,
				userId: userId,
				type: type
			})
		} else if (type === 'track') {
			const res = await Favorite.create({
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
		console.log(
			'Removing-------------------------------------',
			id,
			userId,
			type
		)
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function check({ trackId, radioId, userId }) {
	try {
		if (trackId && !radioId) {
			const res = await Favorite.findOne({
				where: { trackId: String(trackId), userId: String(userId) }
			})
			return res ? true : false
		} else if (!radioId && trackId) {
			const res = await Favorite.findOne({
				where: { radioId: String(radioId), userId: String(userId) }
			})
			return res ? true : false
		}
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	add,
	remove,
	check
}
