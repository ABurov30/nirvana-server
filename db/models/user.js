const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate({ Message, ChatPerUser, ContactPerUser, Contact }) {
			this.hasMany(Message, { foreignKey: 'userId' })
			this.hasMany(ChatPerUser, { foreignKey: 'userId' })
			this.hasMany(Contact, { foreignKey: 'userId' })
			this.hasMany(ContactPerUser, { foreignKey: 'contactOwnerId' })
		}
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
