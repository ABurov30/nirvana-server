const express = require('express')
const { Sequelize } = require('../../db/models')
const radioService = require('../services/radioService')
const authChecker = require('../middleware/authChecker')

const radioController = express.Router()

radioController.get('/uniqNames', authChecker, async (req, res, next) => {
	try {
		const uniqNames = await radioService.uniqNames()
		res.send(uniqNames)
	} catch (e) {
		next(e)
	}
})

radioController.get('/uniqGenre', authChecker, async (req, res, next) => {
	try {
		const uniqueTags = await radioService.uniqTags()
		res.send(uniqueTags)
	} catch (e) {
		next(e)
	}
})

radioController.get('/uniqCountry', authChecker, async (req, res, next) => {
	try {
		const uniqCountry = await radioService.uniqCountry()
		res.send(uniqCountry)
	} catch (e) {
		next(e)
	}
})

radioController.post('/search', authChecker, async (req, res, next) => {
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

radioController.post(
	'/intualSearchName',
	authChecker,
	async (req, res, next) => {
		try {
			const { radio } = req.body
			const stationsTitles = await radioService.intualSearchName(radio)
			res.send(stationsTitles)
		} catch (e) {
			next(e)
		}
	}
)

radioController.post(
	'/intualSearchCountry',
	authChecker,
	async (req, res, next) => {
		try {
			const { country } = req.body
			const countryies = await radioService.intualSearchCountry(country)
			res.send(countryies)
		} catch (e) {
			next(e)
		}
	}
)

radioController.post(
	'/intualSearchGenres',
	authChecker,
	async (req, res, next) => {
		try {
			const { tags } = req.body
			const genres = await radioService.intualSearchTags(tags)
			res.send(genres)
		} catch (e) {
			next(e)
		}
	}
)

radioController.post('/', authChecker, async (req, res, next) => {
	try {
		const { offset, userId } = req.body
		const topRadios = await radioService.topRadios(offset, userId)
		res.send(topRadios)
	} catch (e) {
		next(e)
	}
})

module.exports = radioController
