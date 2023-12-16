const express = require('express')
const imagesService = require('../services/imagesService')

const imagesController = express.Router()

imagesController.get('/', async (req, res) => {
	try {
		const topImages = await imagesService.topImages()
		res.send(topImages)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

module.exports = imagesController
