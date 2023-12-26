const express = require('express')
const tracksService = require('../services/tracksService')

const tracksController = express.Router()

tracksController.get('/uniqTracks', async (req, res) => {
	try {
		const uniqTracks = await tracksService.uniqTracks()
		res.send(uniqTracks)
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(500).send(e.message)
	}
})

tracksController.get('/uniqArtists', async (req, res) => {
	try {
		const uniqArtists = await tracksService.uniqArtists()
		res.send(uniqArtists)
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(500).send(e.message)
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
		console.error('Ошибка:', e)
		return res.status(500).send(e.message)
	}
})

tracksController.post('/intualSearchArtist', async (req, res) => {
	try {
		const { artist } = req.body
		const artists = await tracksService.intualSearchArtist(artist)
		res.send(artists)
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(500).send(e.message)
	}
})

tracksController.post('/intualSearchTrackTitle', async (req, res) => {
	try {
		const { trackTitle: name } = req.body
		const tracks = await tracksService.intualSearchName(name)
		res.send(tracks)
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(500).send(e.message)
	}
})

tracksController.post('/', async (req, res) => {
	try {
		const { offset, userId } = req.body
		const tracks = await tracksService.getTrack(offset, userId)
		res.send(tracks)
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(500).send(e.message)
	}
})

module.exports = tracksController
