const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate({}) {}
	}
	User.init(
		{
			nickname: DataTypes.STRING,
			email: DataTypes.STRING,
			hashpass: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'User'
		}
	)
	return User
}
