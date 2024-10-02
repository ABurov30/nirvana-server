const chatService = require('../services/chatService')
const { sequelize } = require('../../db/models')

async function getChatsByUser(request, response) {
	let result = {
		success: false,
		chats: null,
		errors: null
	}
	try {
		const { id } = request?.body
		let chats = await chatService.getChatsByUser(id)

		if (chats == null) {
			result.errors = {
				code: '200',
				message: 'No result'
			}
			result.success = true
		} else {
			result.chats = chats
			result.success = true
		}
	} catch (error) {
		result.success = true
		result.errors = {
			code: '500',
			message: error.message
		}
	}
	return result
}

async function findChats(request, response) {
	let result = {
		success: false,
		chats: null,
		errors: null
	}
	try {
		const { input } = request?.body
		const chats = await chatService.findChatsByName(input)

		result.success = true
		result.chats = chats
	} catch (error) {
		result.success = true
		result.errors = {
			code: '500',
			message: error.message
		}
	}
	return result
}

async function editChat(request, response) {
	let result = {
		success: false,
		chat: null,
		errors: null
	}
	try {
		const { chat, userId } = request?.body
		let isEdited = await chatService.updateChat(chat, userId)
		if (isEdited) {
			result.errors = {
				code: '200',
				message: 'Updated'
			}
			result.success = true
		} else {
			result.errors = {
				code: '200',
				message: 'Nothing to update'
			}
			result.success = true
		}
	} catch (error) {
		result.success = true
		result.errors = {
			code: '500',
			message: error.message
		}
	}
	return result
}

async function addChat(request, response) {
	let result = {
		success: false,
		chat: null,
		errors: null
	}
	const t = await sequelize.transaction()
	try {
		const { userId } = request?.body
		let newChat = await chatService.addChat(userId)

		if (newChat) {
			result.errors = {
				code: '200',
				message: 'Created'
			}
			result.success = true
			result.chat = newChat
		} else {
			result.errors = {
				code: '200',
				message: 'Nothing created'
			}
			result.success = true
		}
	} catch (error) {
		result.success = true
		result.errors = {
			code: '500',
			message: error.message
		}
		await t.rollback()
	}
	await t.commit()
	return result
}

module.exports = {
	getChatsByUser,
	findChats,
	editChat,
	addChat
}
