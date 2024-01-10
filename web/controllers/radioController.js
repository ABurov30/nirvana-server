const express = require('express')
const { Sequelize } = require('../../db/models')
const radioService = require('../services/radioService')

const radioController = express.Router()

radioController.get('/uniqNames', async (req, res) => {
	try {
		const uniqNames = await radioService.uniqNames()
		res.send(uniqNames)
	} catch (e) {
		next(e)
	}
})

radioController.get('/uniqGenre', async (req, res) => {
	try {
		const uniqueTags = await radioService.uniqTags()
		res.send(uniqueTags)
	} catch (e) {
		next(e)
	}
})

radioController.get('/uniqCountry', async (req, res) => {
	try {
		const uniqCountry = await radioService.uniqCountry()
		res.send(uniqCountry)
	} catch (e) {
		next(e)
	}
})

radioController.post('/search', async (req, res) => {
	try {
		const { name, country, tags, userId } = req.body
		if (name) {
			const station = await radioService.searchByName(name, userId)
			res.send(station)
		} else if (name === '' && country !== '' && tags === '') {
			const stations = await radioService.searchByCountry(country, userId)
			res.send(stations)
		} else if (name === '' && country === '' && tags !== '') {
			const stations = await radioService.searchByTags(tags, userId)
			res.send(stations)
		} else if (name === '' && country !== '' && tags !== '') {
			const stations = await radioService.searchByCountryAndTags(
				country,
				tags,
				userId
			)
			res.send(stations)
		} else {
			const station = await radioService.searchByCountryAndTagsAndName(
				name,
				country,
				tags,
				userId
			)
			res.send(station)
		}
	} catch (e) {
		next(e)
	}
})

radioController.post('/intualSearchName', async (req, res) => {
	try {
		const { name } = req.body
		const stationsTitles = await radioService.intualSearchName(name)
		res.send(stationsTitles)
	} catch (e) {
		next(e)
	}
})

radioController.post('/intualSearchCountry', async (req, res) => {
	try {
		const { country } = req.body
		const countryies = await radioService.intualSearchCountry(country)
		res.send(countryies)
	} catch (e) {
		next(e)
	}
})

radioController.post('/intualSearchGenres', async (req, res) => {
	try {
		const { tags } = req.body
		const genres = await radioService.intualSearchTags(tags)
		res.send(genres)
	} catch (e) {
		next(e)
	}
})

radioController.post('/', async (req, res) => {
	try {
		const { offset, userId } = req.body
		const topRadios = await radioService.topRadios(offset, userId)
		res.send(topRadios)
	} catch (e) {
		next(e)
	}
})

module.exports = radioController
