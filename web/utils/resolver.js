const chatController = require('../controllers/chatController')
const contactController = require('../controllers/contactController')
const messageController = require('../controllers/messageController')
const authController = require('../controllers/authController')

async function getChatsByUser(obj, args, context) {
	const { request, response } = context
	request.body = args
	return await chatController.getChatsByUser(request, response)
}

async function getContactsByUser(obj, args, context) {
	const { request, response } = context
	request.body = args
	return await contactController.getContactsByUser(request, response)
}

async function editContact(obj, args, context) {
	const { request, response } = context
	request.body = args

	return await contactController.editContact(request, response)
}

async function addContact(obj, args, context) {
	const { request, response } = context
	request.body = args
	console.log(args, 'arg')
	return await contactController.addContact(request, response)
}

async function deleteContact(obj, args, context) {
	const { request, response } = context
	request.body = args

	return await contactController.deleteContact(request, response)
}

async function getSearchEntities(obj, args, context) {
	const { request, response } = context
	request.body = args

	const chats = await chatController.findChats(request, response)
	const messages = await messageController.findMessages(request, response)
	const users = await authController.findUsers(request, response)
	return { ...chats, ...messages, ...users }
}

const resolvers = {
	Query: {
		getChatsByUser: getChatsByUser,
		getContactsByUser: getContactsByUser,
		getSearchEntities: getSearchEntities
	},
	Mutation: {
		editContact: editContact,
		deleteContact: deleteContact,
		addContact: addContact
	}
}

module.exports = {
	resolvers
}
