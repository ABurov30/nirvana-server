const { where } = require('sequelize')
const { Message, Sequelize } = require('../../db/models')
const { v4: uuidv4 } = require('uuid')
const { Op } = Sequelize

async function addMessage(data) {
	try {
		const { dataValues } = await Message.create({
			id: uuidv4(),
			userId: data?.userId,
			message: data?.message,
			chatId: data?.chatId
		})
		delete dataValues.updatedAt
		delete dataValues.createdAt
		return { success: true }
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function updateMessage(data) {
	try {
		await Message.update(
			{
				message: data.message
			},
			{
				where: {
					id: data.id
				}
			}
		)

		return { success: true }
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function deleteMessage(id) {
	try {
		await Message.destroy({
			where: {
				id
			}
		})

		return { success: true }
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function findMessages(message) {
	try {
		let messages = await Message.findAll({
			where: {
				name: Sequelize.where(
					Sequelize.fn('LOWER', Sequelize.col('message')),
					{
						[Op.iLike]: `%${message.trim().toLowerCase()}%`
					}
				)
			}
		})
		messages = messages.map(message => message.get({ plain: true }))

		return messages
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	addMessage,
	deleteMessage,
	updateMessage,
	findMessages
}
