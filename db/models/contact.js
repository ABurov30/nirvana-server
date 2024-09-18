const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Contact extends Model {
		static associate({ ContactPerUser, User }) {
			this.hasMany(ContactPerUser, {
				foreignKey: 'contactId'
			})
			this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
		}
	}
	Contact.init(
		{
			name: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			userId: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			sequelize,
			modelName: 'Contact'
		}
	)
	return Contact
}
