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
			attributes: ['name', 'isNewMessage', 'id'],
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
	console.log('🚀 ~ updateChat ~ chat:', chat)
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
				attributes: ['name', 'isNewMessage', 'id']
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

async function deleteMember(memberId, chatId) {
	try {
		await ChatPerUser.destroy({
			where: {
				userId: memberId,
				chatId
			}
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
				attributes: ['name', 'isNewMessage', 'id']
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

		if (!updateChat?.members?.length) {
			await Chat.destroy({ where: { id: updateChat?.id } })
		}

		return { success: true, res: { updatedChat, memberId } }
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function addChat(userId) {
	try {
		const newChat = (
			await Chat.create({
				id: uuidv4(),
				name: 'New chat',
				isNewMessage: false
			})
		).get({ plain: true })

		await ChatPerUser.create({
			id: uuidv4(),
			userId,
			chatId: newChat.id
		})

		const addedChat = (
			await Chat.findOne({
				where: {
					id: newChat.id
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

		let members = await ChatPerUser.findAll({
			where: { chatId: newChat.id },
			include: [{ model: User, attributes: ['nickname', 'id', 'email'] }]
		})

		members = members.map(member => {
			const { User } = member.get({ plain: true })
			return User
		})

		addedChat.members = members

		return addedChat
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function deleteChat(chatId) {
	console.log('🚀 ~ deleteChat ~ chatId:', chatId)
	try {
		await ChatPerUser.destroy({
			where: {
				chatId: chatId
			}
		})
		await Message.destroy({
			where: {
				chatId: chatId
			}
		})

		await Chat.destroy({ where: { id: chatId } })
		return { success: true }
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	getChatsByUser,
	findChatsByName,
	updateChat,
	addMembers,
	deleteMember,
	addChat,
	deleteChat
}
