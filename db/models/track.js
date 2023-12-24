'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Track extends Model {
		static associate(models) {}
	}
	Track.init(
		{
			name: DataTypes.TEXT,
			artist: DataTypes.TEXT,
			url: DataTypes.TEXT,
			favicon: DataTypes.TEXT
		},
		{
			sequelize,
			modelName: 'Track'
		}
	)
	return Track
}
