const { Image, Sequelize } = require('../../db/models')

async function topImages() {
	const results = await Image.findAll({
		limit: 10
	})
	console.log(results, 'images')
	return results.map(result => result.dataValues)
}

module.exports = {
	topImages
}
