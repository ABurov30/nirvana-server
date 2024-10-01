const messageService = require('../services/messageService')
const chatService = require('../services/chatService')

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
		const { success, res } = await chatService.addMembers(
			data.usersToAdd,
			data.chatId
		)

		if (success) socket.broadcast.emit('added members', res)
	})

	socket.on('delete member', async data => {
		const { success, res } = await chatService.deleteMember(
			data.memberId,
			data.chatId
		)

		if (success) socket.broadcast.emit('deleted member', res)
	})
}

module.exports = {
	socketController
}
