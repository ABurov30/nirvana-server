const express = require('express')
const favoriteService = require('../services/favoriteService')
const trackMapper = require('../mapper/trackMapper')
const authChecker = require('../middleware/authChecker')

const favoriteController = express.Router()

favoriteController.post('/', authChecker, async (req, res, next) => {
	try {
		const { id: trackId, userId, type } = req.body
		await favoriteService.add(trackId, userId, type)
		res.sendStatus(200)
	} catch (e) {
		next(e)
	}
})

favoriteController.post('/all', authChecker, async (req, res, next) => {
	try {
		const { offset, userId, type } = req.body
		const favorites = await favoriteService.findAll(offset, userId, type)
		const result = await trackMapper.toClient(favorites, type, userId)
		res.json(result)
	} catch (e) {
		next(e)
	}
})

favoriteController.delete('/', authChecker, async (req, res, next) => {
	try {
		const { id: trackId, userId, type } = req.body
		await favoriteService.remove(trackId, userId, type)
		res.sendStatus(200)
	} catch (e) {
		next(e)
	}
})

module.exports = favoriteController
