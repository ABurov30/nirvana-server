const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Message extends Model {
		static associate({ Chat, User }) {
			this.belongsTo(Chat, { foreignKey: 'chatId' })
			this.belongsTo(User, { foreignKey: 'userId', as: 'user' })
		}
	}
	Message.init(
		{
			userId: DataTypes.STRING,
			message: DataTypes.TEXT,
			chatId: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Message'
		}
	)
	return Message
}
