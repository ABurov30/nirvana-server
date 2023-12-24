const { Promo, Sequelize } = require('../../db/models')

async function getPromo() {
	try {
		const results = await Promo.findAll({})
		return results.map(result => result.dataValues)
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	getPromo
}
