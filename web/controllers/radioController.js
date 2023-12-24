const express = require('express')
const { Sequelize } = require('../../db/models')
const { Op } = Sequelize
const radioService = require('../services/radioService')

const radioController = express.Router()

radioController.get('/uniqNames', async (req, res) => {
	try {
		const uniqNames = await radioService.uniqNames()
		res.send(uniqNames)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

radioController.get('/uniqGenre', async (req, res) => {
	try {
		const uniqueTags = await radioService.uniqTags()
		res.send(uniqueTags)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

radioController.get('/uniqCountry', async (req, res) => {
	try {
		const uniqCountry = await radioService.uniqCountry()
		res.send(uniqCountry)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

radioController.post('/search', async (req, res) => {
	try {
		const { name, country, tags } = req.body
		if (name) {
			const station = await radioService.searchByName(name)
			res.send(station)
		} else if (name === '' && country !== '' && tags === '') {
			const stations = await radioService.searchByCountry(country)
			res.send(stations)
		} else if (name === '' && country === '' && tags !== '') {
			const stations = await radioService.searchByTags(tags)
			res.send(stations)
		} else if (name === '' && country !== '' && tags !== '') {
			const stations = await radioService.searchByCountryAndTags(
				country,
				tags
			)
			res.send(stations)
		} else {
			const station = await radioService.searchByCountryAndTagsAndName(
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

radioController.get('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const station = await radioService.findById(id)
		res.send(station)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

radioController.post('/', async (req, res) => {
	try {
		const { offset } = req.body
		const topRadios = await radioService.topRadios(offset)
		res.send(topRadios)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

module.exports = radioController
