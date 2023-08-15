const express = require('express')
const { Station, Sequelize } = require('../db/models')
const { Op } = Sequelize

const musicRouter = express.Router()

musicRouter.get('/', async (req, res) => {
	try {
		const results = await Station.findAll({
			order: [
				['votes', 'DESC'],
				['lastcheckoktime', 'DESC']
			],
			limit: 15
		})

		const topRadio = results.map(result => result.dataValues)
		console.log(topRadio, '---------------')
		res.send(topRadio)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

musicRouter.get('/uniqNames', async (req, res) => {
	try {
		const results = await Station.findAll({
			attributes: ['name'],
			order: [
				['votes', 'DESC'],
				['lastcheckoktime', 'DESC']
			],
			limit: 15
		})
		const uniqNames = results.map(result => result.dataValues)
		res.send(uniqNames)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

musicRouter.get('/uniqGenre', async (req, res) => {
	try {
		const results = await Station.findAll({
			attributes: [
				'tags',
				[Sequelize.fn('SUM', Sequelize.col('votes')), 'votesSum']
			],
			group: ['tags'],
			order: [[Sequelize.col('votesSum'), 'DESC']],
			limit: 20
		})
		const tags = results
			.map(result => result.dataValues.tags)
			.join(' ')
			.split(' ')
			.join(',')
			.split(',')
			.filter(
				str =>
					str.length > 2 &&
					str.length < 15 &&
					!str.includes('fm') &&
					!str.includes('radio')
			)
		let uniqueTags = [...new Set(tags)]
		uniqueTags.map((el, i) => {
			return { label: el, key: i }
		})
		res.send(uniqueTags)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

musicRouter.get('/uniqCountry', async (req, res) => {
	try {
		const results = await Station.findAll({
			attributes: [
				'country',
				[Sequelize.fn('SUM', Sequelize.col('votes')), 'votesSum']
			],
			group: ['country'],
			order: [[Sequelize.col('votesSum'), 'DESC']],
			limit: 10
		})
		const uniqueCountry = results
			.map(result => result.dataValues.country)
			.filter(str => str.length > 2)
			.map((str, i) => {
				return { label: str, key: i }
			})
		res.send(uniqueCountry)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

musicRouter.post('/search', async (req, res) => {
	try {
		const { name, country, tags } = req.body
		if (name) {
			const station = await Station.findOne({
				where: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('name')),
					{
						[Op.iLike]: `%${name.trim().toLowerCase()}%`
					}
				)
			})
			res.send([station.dataValues])
		} else if (name === '' && country !== '' && tags === '') {
			const result = await Station.findAll({
				where: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('country')),
					{
						[Op.iLike]: `%${country.trim().toLowerCase()}%`
					}
				),
				order: [['votes', 'DESC']],
				limit: 12
			})
			const stations = result.map(el => el.dataValues)
			res.send(stations)
		} else if (name === '' && country === '' && tags !== '') {
			const result = await Station.findAll({
				where: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('tags')),
					{
						[Op.iLike]: `%${tags.trim().toLowerCase()}%`
					}
				),
				order: [['votes', 'DESC']],
				limit: 12
			})
			const stations = result.map(el => el.dataValues)
			res.send(stations)
		} else if (name === '' && country !== '' && tags !== '') {
			const result = await Station.findAll({
				where: {
					country: Sequelize.where(
						Sequelize.fn('LOWER', Sequelize.col('country')),
						{
							[Op.iLike]: `%${country.trim().toLowerCase()}%`
						}
					),
					tags: Sequelize.where(
						Sequelize.fn('LOWER', Sequelize.col('tags')),
						{
							[Op.iLike]: `%${tags.trim().toLowerCase()}%`
						}
					)
				},
				order: [['votes', 'DESC']],
				limit: 12
			})
			const stations = result.map(el => el.dataValues)
			res.send(stations)
		} else {
			const station = await Station.findOne({
				where: {
					name: Sequelize.where(
						Sequelize.fn('LOWER', Sequelize.col('name')),
						{
							[Op.iLike]: `%${name.trim().toLowerCase()}%`
						}
					),
					country: Sequelize.where(
						Sequelize.fn('LOWER', Sequelize.col('country')),
						{
							[Op.iLike]: `%${country.trim().toLowerCase()}%`
						}
					),
					tags: Sequelize.where(
						Sequelize.fn('LOWER', Sequelize.col('tags')),
						{
							[Op.iLike]: `%${tags.trim().toLowerCase()}%`
						}
					)
				}
			})
			res.send([station.dataValues])
		}
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

musicRouter.get('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const station = await Station.findOne({
			where: { id }
		})
		res.send(station.dataValues)
	} catch (error) {
		console.error('Ошибка:', error)
	}
})

module.exports = musicRouter
