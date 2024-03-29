const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate({}) {}
	}
	User.init(
		{
			nickname: DataTypes.STRING,
			email: DataTypes.STRING,
			hashpass: DataTypes.STRING,
			confirmationCode: DataTypes.STRING,
			confirmed: DataTypes.BOOLEAN,
			isAdmin: DataTypes.BOOLEAN
		},
		{
			sequelize,
			modelName: 'User'
		}
	)
	return User
}
