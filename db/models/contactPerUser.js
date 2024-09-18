const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class ContactPerUser extends Model {
		static associate({ User, Contact }) {
			this.belongsTo(User, { foreignKey: 'contactOwnerId', as: 'user' })
			this.belongsTo(Contact, { foreignKey: 'contactId', as: 'contact' })
		}
	}
	ContactPerUser.init(
		{
			contactOwnerId: DataTypes.STRING,
			contactId: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'ContactPerUser'
		}
	)
	return ContactPerUser
}
