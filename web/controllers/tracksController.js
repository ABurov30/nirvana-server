const express = require('express')
const tracksService = require('../services/tracksService')
const cloudService = require('../services/cloudService')
const multer = require('multer')
const storage = multer.memoryStorage()
const { sequelize } = require('../../db/models')

const upload = multer({ storage: storage })

const tracksController = express.Router()

tracksController.get('/uniqTracks', async (req, res) => {
	try {
		const uniqTracks = await tracksService.uniqTracks()
		res.send(uniqTracks)
	} catch (e) {
		next(e)
	}
})

tracksController.get('/uniqArtists', async (req, res) => {
	try {
		const uniqArtists = await tracksService.uniqArtists()
		res.send(uniqArtists)
	} catch (e) {
		next(e)
	}
})

tracksController.post('/search', async (req, res) => {
	try {
		const { trackTitle: name, artist, userId } = req.body
		if (name && !artist) {
			const tracks = await tracksService.searchByName(name, userId)
			res.send(tracks)
		} else if (!name && artist) {
			const tracks = await tracksService.searchByArtist(artist, userId)
			res.send(tracks)
		} else {
			const tracks = await tracksService.searchByArtistAndName(
				name,
				artist,
				userId
			)
			res.send(tracks)
		}
	} catch (e) {
		next(e)
	}
})

tracksController.post('/intualSearchArtist', async (req, res) => {
	try {
		const { artist } = req.body
		const artists = await tracksService.intualSearchArtist(artist)
		res.send(artists)
	} catch (e) {
		next(e)
	}
})

tracksController.post('/intualSearchTrackTitle', async (req, res, next) => {
	try {
		const { trackTitle: name } = req.body
		const tracks = await tracksService.intualSearchName(name)
		res.send(tracks)
	} catch (e) {
		next(e)
	}
})

tracksController.post(
	'/uploadTrack',
	upload.fields([
		{ name: 'cover', maxCount: 1 },
		{ name: 'track', maxCount: 1 }
	]),
	async (req, res) => {
		const t = await sequelize.transaction()
		try {
			const { trackName, artist } = req.body

			const cover = req.files?.cover[0]?.buffer
			const track = req.files?.track[0]?.buffer

			const { img, mp3 } = await cloudService.upload({
				track,
				cover
			})
			await tracksService.addTrack({ artist, trackName, img, mp3 })
			await t.commit()
			res.status(200)
		} catch (e) {
			await t.rollback()
			next(e)
		}
	}
)

tracksController.post('/', async (req, res) => {
	try {
		const { offset, userId } = req.body
		const tracks = await tracksService.getTrack(offset, userId)
		res.send(tracks)
	} catch (e) {
		next(e)
	}
})

module.exports = tracksController
