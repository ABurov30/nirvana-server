const {
	Chat,
	Message,
	ChatPerUser,
	User,
	Sequelize
} = require('../../db/models')
const { Op } = Sequelize

async function getChatsByUser(userId) {
	try {
		let chatsId = await ChatPerUser.findAll({
			where: { userId },
			attributes: ['chatId']
		})
		chatsId = chatsId.map(({ dataValues }) => dataValues?.chatId)
		const chatsIdDictionary = new Set(chatsId)

		let chats = await Chat.findAll({
			include: [
				{
					model: Message,
					as: 'messages',
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['nickname', 'id', 'email']
						}
					],
					attributes: [
						'userId',
						'id',
						'message',
						'chatId',
						'createdAt'
					]
				}
			],
			attributes: ['name', 'lastMessage', 'isNewMessage', 'id'],
			order: [[Sequelize.col('messages.createdAt'), 'ASC']]
		})

		chats = chats
			.map(chat => chat.get({ plain: true }))
			.filter(chat => {
				if (chatsIdDictionary.has(chat?.id)) return chat
			})
		chats = await Promise.all(
			chats.map(async chat => {
				const { id } = chat

				let users = await ChatPerUser.findAll({
					where: { chatId: chat.id },
					include: [
						{ model: User, attributes: ['nickname', 'id', 'email'] }
					]
				})
				users = users.map(user => {
					const { User } = user.get({ plain: true })
					return User
				})
				return { ...chat, members: users }
			})
		)

		return chats
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function findChatsByName(name) {
	try {
		let chats = await Chat.findAll({
			where: {
				name: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('name')),
					{
						[Op.iLike]: `%${name.trim().toLowerCase()}%`
					}
				)
			}
		})
		chats = chats.map(chat => chat.get({ plain: true }))

		return chats
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function editChat(chat, userId) {
	try {
		const res = await Chat.update(chat, {
			where: {
				id: chat.id
			}
		})

		return res[0] > 0
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	getChatsByUser,
	findChatsByName,
	editChat
}
