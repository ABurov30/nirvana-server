const { Promo, Sequelize } = require('../../db/models')

async function getPromo() {
	const results = await Promo.findAll({})
	return results.map(result => result.dataValues)
}

module.exports = {
	getPromo
}
