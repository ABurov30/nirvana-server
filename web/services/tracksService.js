const { Track, Sequelize } = require('../../db/models')
const { Op } = Sequelize
const trackMapper = require('../mapper/trackMapper')
const { v4: uuidv4 } = require('uuid')

async function getTrack(offset, userId) {
	try {
		let results = await Track.findAll({
			where: {
				moderated: true
			},
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
			where: {
				moderated: true
			},
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
			where: {
				moderated: true
			},
			attributes: ['artist'],
			limit: 10
		})
		results = results.map(result => result.dataValues.artist)
		results = [...new Set(results)]
		return results?.map((el, i) => {
			return { label: el, key: i }
		})
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function searchByName(name, userId) {
	try {
		const tracks = await Track.findOne({
			where: {
				name: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('name')),
					{
						[Op.iLike]: `%${name.trim().toLowerCase()}%`
					}
				),
				moderated: true
			}
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
		let tracks = await Track.findAll({
			where: {
				name: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('name')),
					{
						[Op.like]: `%${name.trim().toLowerCase()}%`
					}
				),
				moderated: true
			},
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
			where: {
				artist: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('artist')),
					{
						[Op.iLike]: `%${artist.trim().toLowerCase()}%`
					}
				),
				moderated: true
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

async function intualSearchArtist(artist) {
	try {
		const artists = await Track.findAll({
			where: {
				artist: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('artist')),
					{
						[Op.like]: `%${artist.trim().toLowerCase()}%`
					}
				),
				moderated: true
			},
			attributes: ['artist'],
			limit: 3
		})

		let res = artists.map(artist => artist.dataValues.artist)
		res = [...new Set(res)]
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
				),
				moderated: true
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

async function addTrack({ artist, trackName, img, mp3 }) {
	try {
		await Track.create({
			id: uuidv4(),
			name: trackName,
			favicon: img,
			artist: artist,
			url: mp3
		})
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
	searchByArtistAndName,
	addTrack
}
