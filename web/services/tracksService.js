const { Track, Sequelize } = require('../../db/models')
const { Op } = Sequelize
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

async function uniqTracks() {
	try {
		const results = await Track.findAll({
			attributes: ['name'],
			limit: 10
		})
		return results.map((el, i) => {
			return { label: el.name, key: i }
		})
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function uniqArtists() {
	try {
		let results = await Track.findAll({
			attributes: ['artist'],
			limit: 10
		})
		return results?.map((el, i) => {
			return { label: el.dataValues.artist, key: i }
		})
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function searchByName(name, userId) {
	try {
		const tracks = await Track.findOne({
			where: Sequelize.where(
				Sequelize.fn('LOWER', Sequelize.col('name')),
				{
					[Op.iLike]: `%${name.trim().toLowerCase()}%`
				}
			)
		})
		const res = await trackMapper.toClient(
			[tracks?.dataValues],
			'track',
			userId
		)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function intualSearchName(name) {
	try {
		const tracks = await Track.findAll({
			where: Sequelize.where(
				Sequelize.fn('LOWER', Sequelize.col('name')),
				{
					[Op.like]: `%${name.trim().toLowerCase()}%`
				}
			),
			attributes: ['name'],
			limit: 3
		})
		const res = tracks.map(track => track.dataValues.name)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function searchByArtist(artist, userId) {
	try {
		const track = await Track.findOne({
			where: Sequelize.where(
				Sequelize.fn('LOWER', Sequelize.col('artist')),
				{
					[Op.iLike]: `%${artist.trim().toLowerCase()}%`
				}
			)
		})
		const res = await trackMapper.toClient(
			[track?.dataValues],
			'track',
			userId
		)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function intualSearchArtist(artist) {
	try {
		const artists = await Track.findAll({
			where: Sequelize.where(
				Sequelize.fn('LOWER', Sequelize.col('artist')),
				{
					[Op.like]: `%${artist.trim().toLowerCase()}%`
				}
			),
			attributes: ['artist'],
			limit: 3
		})

		const res = artists.map(artist => artist.dataValues.artist)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function searchByArtistAndName(name, artist, userId) {
	try {
		const track = await Track.findOne({
			where: {
				name: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('name')),
					{
						[Op.iLike]: `%${name.trim().toLowerCase()}%`
					}
				),
				artist: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('artist')),
					{
						[Op.iLike]: `%${artist.trim().toLowerCase()}%`
					}
				)
			}
		})
		const res = await trackMapper.toClient(
			[track?.dataValues],
			'track',
			userId
		)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	getTrack,
	uniqTracks,
	uniqArtists,
	searchByName,
	intualSearchName,
	searchByArtist,
	intualSearchArtist,
	searchByArtistAndName
}
