const { Radio, Sequelize } = require('../../db/models')
const { Op } = Sequelize

async function uniqNames() {
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
}

async function uniqTags() {
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
}

async function uniqCountry() {
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
}

async function searchByName(name) {
	const station = await Radio.findOne({
		where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), {
			[Op.iLike]: `%${name.trim().toLowerCase()}%`
		})
	})
	return [station.dataValues]
}

async function searchByCountry(country) {
	const result = await Radio.findAll({
		where: Sequelize.where(
			Sequelize.fn('LOWER', Sequelize.col('country')),
			{
				[Op.iLike]: `%${country.trim().toLowerCase()}%`
			}
		),
		order: [['votes', 'DESC']],
		limit: 5
	})
	return result.map(el => el.dataValues)
}

async function searchByTags(tags) {
	const result = await Radio.findAll({
		where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('tags')), {
			[Op.iLike]: `%${tags.trim().toLowerCase()}%`
		}),
		order: [['votes', 'DESC']],
		limit: 5
	})
	return result.map(el => el.dataValues)
}

async function searchByCountryAndTags(country, tags) {
	const result = await Radio.findAll({
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
	return result.map(el => el.dataValues)
}

async function searchByCountryAndTagsAndName(name, country, tags) {
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
	return [station.dataValues]
}

async function findById(id) {
	const station = await Radio.findOne({
		where: { id }
	})
	return [station.dataValues]
}

async function topRadios(offset) {
	const results = await Radio.findAll({
		order: [
			['votes', 'DESC'],
			['lastcheckoktime', 'DESC']
		],
		limit: 5,
		offset: offset
	})

	return results.map(result => result.dataValues)
}

module.exports = {
	topRadios,
	uniqNames,
	uniqTags,
	uniqCountry,
	findById,
	searchByName,
	searchByCountry,
	searchByTags,
	searchByCountryAndTags,
	searchByCountryAndTagsAndName
}
