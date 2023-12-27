const express = require('express')
const promoService = require('../services/promoService')

const promoController = express.Router()

promoController.get('/', async (req, res) => {
	try {
		const topImages = await promoService.getPromo()
		res.send(topImages)
	} catch (e) {
		console.error(e)
		return res.status(500).send(e.message)
	}
})

module.exports = promoController
