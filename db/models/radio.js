const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Radio extends Model {
		static associate(models) {}
	}
	Radio.init(
		{
			name: DataTypes.TEXT,
			url: DataTypes.TEXT,
			favicon: DataTypes.TEXT,
			tags: DataTypes.TEXT,
			country: DataTypes.TEXT,
			void: DataTypes.TEXT,
			lastcheckoktime: DataTypes.TEXT,
			void: DataTypes.TEXT
		},
		{
			sequelize,
			modelName: 'Radio'
		}
	)
	return Radio
}
