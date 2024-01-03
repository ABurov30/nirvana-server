const express = require('express')
const favoriteService = require('../services/favoriteService')

const favoriteController = express.Router()


favoriteController.post('/add', async (req, res) => {
	try {
		const { id: trackId, userId, type } = req.body
		await favoriteService.add(trackId, userId, type)
		res.sendStatus(200)
	} catch (e) {
		console.error(e)
		return res.status(500).send(e.message)
	}
})

favoriteController.post('/remove', async (req, res) => {
	try {
		const { id: trackId, userId, type } = req.body
		await favoriteService.remove(trackId, userId, type)
		res.sendStatus(200)
	} catch (e) {
		console.error(e)
		return res.status(500).send(e.message)
	}
})

module.exports = favoriteController
