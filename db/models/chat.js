const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
	class Chat extends Model {
		static associate({ Message, ChatPerUser }) {
			this.hasMany(Message, {
				foreignKey: 'chatId',
				as: 'messages'
			})
			this.hasMany(ChatPerUser, {
				foreignKey: 'chatId'
			})
		}
	}
	Chat.init(
		{
			name: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			lastMessage: {
				type: DataTypes.TEXT,
				allowNull: true
			},
			isNewMessage: {
				type: DataTypes.BOOLEAN,
				defaultValue: false
			}
		},
		{
			sequelize,
			modelName: 'Chat'
		}
	)
	return Chat
}
