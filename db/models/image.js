'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Image extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	Image.init(
		{
			alt_description: DataTypes.TEXT,
			description: DataTypes.TEXT,
			raw: DataTypes.TEXT,
			full: DataTypes.TEXT,
			favicon: DataTypes.TEXT,
			small: DataTypes.TEXT,
			thumb: DataTypes.TEXT,
			small_s3: DataTypes.TEXT,
			self: DataTypes.TEXT,
			html: DataTypes.TEXT,
			download: DataTypes.TEXT,
			download_location: DataTypes.TEXT,
			likes: DataTypes.INTEGER
		},
		{
			sequelize,
			modelName: 'Image'
		}
	)
	return Image
}
