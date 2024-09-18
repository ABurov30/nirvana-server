const messageService = require('../services/messageService')

async function findMessages(request, response) {
	let result = {
		success: false,
		contacts: null,
		errors: null
	}
	try {
		const { input } = request?.body
		const messages = await messageService.findMessages(input)

		result.success = true
		result.messages = messages
	} catch (error) {
		result.success = true
		result.errors = {
			code: '500',
			message: error.message
		}
	}
	return result
}

module.exports = {
	findMessages
}
