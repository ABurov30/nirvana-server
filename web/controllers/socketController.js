const messageService = require('../services/messageService')
const chatService = require('../services/chatService')
const { sequelize } = require('../../db/models')

function socketController(socket) {
	socket.on('send message', async data => {
		const { success } = await messageService.addMessage(data)
		if (success) socket.broadcast.emit('get message', data)
	})

	socket.on('update message', async data => {
		const { success } = await messageService.updateMessage(data)
		if (success) socket.broadcast.emit('updated message', data)
	})

	socket.on('delete message', async data => {
		const { success } = await messageService.deleteMessage(data.id)
		if (success) socket.broadcast.emit('deleted message', data)
	})

	socket.on('update chat', async data => {
		const { success, res } = await chatService.updateChat(data)

		if (success) socket.broadcast.emit('updated chat', res)
	})

	socket.on('add members', async data => {
		const t = await sequelize.transaction()
		try {
			const { success, res } = await chatService.addMembers(
				data.usersToAdd,
				data.chatId
			)

			if (success) socket.broadcast.emit('added members', res)
			await t.commit()
		} catch (e) {
			console.error(e)
			await t.rollback()
		}
	})

	socket.on('delete member', async data => {
		const t = await sequelize.transaction()
		try {
			const { success, res } = await chatService.deleteMember(
				data.memberId,
				data.chatId
			)

			if (success) socket.broadcast.emit('deleted member', res)
			await t.commit()
		} catch (e) {
			console.error
			await t.rollback()
		}
	})

	socket.on('delete chat', async data => {
		const t = await sequelize.transaction()
		try {
			const { success } = await chatService.deleteChat(data.chatId)

			if (success)
				socket.broadcast.emit('deleted chat', { chatId: data.chatId })
			await t.commit()
		} catch (e) {
			console.error
			await t.rollback()
		}
	})
}

module.exports = {
	socketController
}
