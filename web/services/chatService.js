const { v4: uuidv4 } = require('uuid')
const {
	Chat,
	Message,
	ChatPerUser,
	User,
	Sequelize
} = require('../../db/models')
const { where } = require('sequelize')
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

async function updateChat(chat) {
	try {
		const res = await Chat.update(chat, {
			where: {
				id: chat.id
			},
			returning: true
		})

		const editedChat = (
			await Chat.findOne({
				where: {
					id: chat.id
				},
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
				]
			})
		).get({ plain: true })

		let users = await ChatPerUser.findAll({
			where: { chatId: chat.id },
			include: [{ model: User, attributes: ['nickname', 'id', 'email'] }]
		})
		users = users.map(user => {
			const { User } = user.get({ plain: true })
			return User
		})

		editedChat.members = users

		return { success: res[0] > 0, res: editedChat }
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function addMembers(usersToAdd, chatId) {
	try {
		await usersToAdd.forEach(async user => {
			await ChatPerUser.create({ chatId, userId: user.id, id: uuidv4() })
		})

		const updatedChat = (
			await Chat.findOne({
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
				where: { id: chatId },
				attributes: ['name', 'lastMessage', 'isNewMessage', 'id']
			})
		).get({ plain: true })

		let members = await ChatPerUser.findAll({
			where: { chatId },
			include: [{ model: User, attributes: ['nickname', 'id', 'email'] }]
		})

		members = members.map(member => {
			const { User } = member.get({ plain: true })
			return User
		})

		updatedChat.members = members

		return { success: true, res: updatedChat }
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	getChatsByUser,
	findChatsByName,
	updateChat,
	addMembers
}
