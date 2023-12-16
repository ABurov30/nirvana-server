const express = require('express')
const { Station, Sequelize } = require('../../db/models')
const { Op } = Sequelize
const musicService = require('../services/musicService')

const musicController = express.Router()

musicController.get('/uniqNames', async (req, res) => {
	try {
		const uniqNames = await musicService.uniqNames()
		res.send(uniqNames)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

musicController.get('/uniqGenre', async (req, res) => {
	try {
		const uniqueTags = await musicService.uniqTags()
		res.send(uniqueTags)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

musicController.get('/uniqCountry', async (req, res) => {
	try {
		const uniqCountry = await musicService.uniqCountry()
		res.send(uniqCountry)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

musicController.post('/search', async (req, res) => {
	try {
		const { name, country, tags } = req.body
		if (name) {
			const station = await musicService.searchByName(name)
			res.send(station)
		} else if (name === '' && country !== '' && tags === '') {
			const stations = await musicService.searchByCountry(country)
			res.send(stations)
		} else if (name === '' && country === '' && tags !== '') {
			const stations = await musicService.searchByTags(tags)
			res.send(stations)
		} else if (name === '' && country !== '' && tags !== '') {
			const stations = await musicService.searchByCountryAndTags(
				country,
				tags
			)
			res.send(stations)
		} else {
			const station = await musicService.searchByCountryAndTagsAndName(
				name,
				country,
				tags
			)
			res.send(station)
		}
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

musicController.get('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const station = await musicService.findById(id)
		res.send(station)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

musicController.post('/', async (req, res) => {
	try {
		const { offset } = req.body
		const topRadios = await musicService.topRadios(offset)
		res.send(topRadios)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

module.exports = musicController
