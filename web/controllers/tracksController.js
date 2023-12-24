const express = require('express')
const tracksService = require('../services/tracksService')

const tracksController = express.Router()

tracksController.post('/', async (req, res) => {
	try {
		const { offset } = req.body
		const tracks = await tracksService.getTrack(offset)
		res.send(tracks)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

module.exports = tracksController
