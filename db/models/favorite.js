const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Favorite extends Model {
		static associate({ User, Track, Radio }) {
			this.belongsTo(User, { foreignKey: 'userId' })
			this.belongsTo(Track, { foreignKey: 'trackId' })
			this.belongsTo(Radio, { foreignKey: 'radioId' })
		}
	}
	Favorite.init(
		{
			radioId: DataTypes.STRING,
			trackId: DataTypes.STRING,
			userId: DataTypes.STRING,
			type: DataTypes.TEXT
		},
		{
			sequelize,
			modelName: 'Favorite'
		}
	)
	return Favorite
}
