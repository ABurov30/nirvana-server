'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Promo extends Model {
		static associate(models) {}
	}
	Promo.init(
		{ favicon: DataTypes.TEXT },
		{
			sequelize,
			modelName: 'Promo'
		}
	)
	return Promo
}
