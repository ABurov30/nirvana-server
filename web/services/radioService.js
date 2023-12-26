const { tr } = require('@faker-js/faker')
const { Radio, Sequelize } = require('../../db/models')
const { Op } = Sequelize
const trackMapper = require('../mapper/trackMapper')

async function uniqNames() {
	try {
		const results = await Radio.findAll({
			attributes: ['name'],
			order: [
				['votes', 'DESC'],
				['lastcheckoktime', 'DESC']
			],
			limit: 10
		})
		return results.map((el, i) => {
			return { label: el.name, key: i }
		})
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function uniqTags() {
	try {
		const results = await Radio.findAll({
			attributes: [
				'tags',
				[Sequelize.fn('SUM', Sequelize.col('votes')), 'votesSum']
			],
			group: ['tags'],
			order: [[Sequelize.col('votesSum'), 'DESC']],
			limit: 10
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
		return uniqueTags.map((el, i) => {
			return { label: el, key: i }
		})
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function uniqCountry() {
	try {
		const results = await Radio.findAll({
			attributes: [
				'country',
				[Sequelize.fn('SUM', Sequelize.col('votes')), 'votesSum']
			],
			group: ['country'],
			order: [[Sequelize.col('votesSum'), 'DESC']],
			limit: 10
		})
		return results
			.map(result => result.dataValues.country)
			.filter(str => str.length > 2)
			.map((str, i) => {
				return { label: str, key: i }
			})
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function searchByName(name, userId) {
	try {
		const station = await Radio.findOne({
			where: Sequelize.where(
				Sequelize.fn('LOWER', Sequelize.col('name')),
				{
					[Op.iLike]: `%${name.trim().toLowerCase()}%`
				}
			)
		})
		const res = await trackMapper.toClient(
			[station.dataValues],
			'radio',
			userId
		)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function intualSearchName(name) {
	try {
		const stations = await Radio.findAll({
			where: Sequelize.where(
				Sequelize.fn('LOWER', Sequelize.col('name')),
				{
					[Op.like]: `%${name.trim().toLowerCase()}%`
				}
			),
			attributes: ['name'],
			limit: 3
		})
		const res = stations.map(station => station.dataValues.name)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function searchByCountry(country, userId) {
	try {
		let results = await Radio.findAll({
			where: Sequelize.where(
				Sequelize.fn('LOWER', Sequelize.col('country')),
				{
					[Op.iLike]: `%${country.trim().toLowerCase()}%`
				}
			),
			order: [['votes', 'DESC']],
			limit: 5
		})
		results = results.map(result => result.dataValues)
		const res = await trackMapper.toClient(results, 'radio', userId)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function intualSearchCountry(country) {
	try {
		const countries = await Radio.findAll({
			where: Sequelize.where(
				Sequelize.fn('LOWER', Sequelize.col('country')),
				{
					[Op.like]: `%${country.trim().toLowerCase()}%`
				}
			),
			attributes: ['country'],
			limit: 3
		})
		const res = countries.map(country => country.dataValues.country)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function searchByTags(tags, userId) {
	try {
		let results = await Radio.findAll({
			where: Sequelize.where(
				Sequelize.fn('LOWER', Sequelize.col('tags')),
				{
					[Op.iLike]: `%${tags.trim().toLowerCase()}%`
				}
			),
			order: [['votes', 'DESC']],
			limit: 5
		})
		results = results.map(result => result.dataValues)
		const res = await trackMapper.toClient(results, 'radio', userId)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function intualSearchTags(tags) {
	try {
		const genres = await Radio.findAll({
			where: Sequelize.where(
				Sequelize.fn('LOWER', Sequelize.col('tags')),
				{
					[Op.like]: `%${tags.trim().toLowerCase()}%`
				}
			),
			attributes: ['tags'],
			limit: 3
		})
		const res = genres
			.map(genre => genre.dataValues.tags)
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
		let uniqueTags = [...new Set(res)]
		return uniqueTags.map((el, i) => {
			return { label: el, key: i }
		})
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function searchByCountryAndTags(country, tags, userId) {
	try {
		let results = await Radio.findAll({
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
			limit: 5
		})
		results = results.map(result => result.dataValues)
		const res = await trackMapper.toClient(results, 'radio', userId)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function searchByCountryAndTagsAndName(name, country, tags, userId) {
	try {
		const station = await Radio.findOne({
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
		const res = await trackMapper.toClient(
			[station.dataValues],
			'radio',
			userId
		)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function topRadios(offset, userId) {
	try {
		const radios = await Radio.findAll({
			order: [
				['votes', 'DESC'],
				['lastcheckoktime', 'DESC']
			],
			limit: 5,
			offset: offset
		})
		const results = radios.map(result => result.dataValues)
		const response = await trackMapper.toClient(results, 'radio', userId)
		return response
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	topRadios,
	uniqNames,
	uniqTags,
	uniqCountry,
	searchByName,
	intualSearchName,
	searchByCountry,
	intualSearchCountry,
	searchByTags,
	intualSearchTags,
	searchByCountryAndTags,
	searchByCountryAndTagsAndName
}
