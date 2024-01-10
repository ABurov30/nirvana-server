const express = require('express')
const promoService = require('../services/promoService')

const promoController = express.Router()

promoController.get('/', async (req, res) => {
	try {
		const topImages = await promoService.getPromo()
		res.send(topImages)
	} catch (e) {
		next(e)
	}
})

module.exports = promoController
