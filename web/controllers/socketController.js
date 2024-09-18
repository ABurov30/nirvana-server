const messageService = require('../services/messageService')

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
}

module.exports = {
	socketController
}
