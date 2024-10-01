const {
	ContactPerUser,
	User,
	Contact,
	ChatPerUser
} = require('../../db/models')
const { v4: uuidv4 } = require('uuid')

async function getContactByUser(contactOwnerId) {
	try {
		let contacts = await ContactPerUser.findAll({
			where: { contactOwnerId },
			include: [
				{
					model: Contact,
					as: 'contact',
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['nickname', 'id', 'email']
						}
					]
				}
			]
		})
		contacts = contacts
			.map(contact => contact.get({ plain: true }))
			.map(({ contact }) => contact)

		return contacts
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function getContactsToAddInChat(userId, chatId) {
	try {
		let contacts = await ContactPerUser.findAll({
			where: { contactOwnerId: userId },
			include: [
				{
					model: Contact,
					as: 'contact',
					include: [
						{
							model: User,
							as: 'user',
							attributes: ['nickname', 'id', 'email']
						}
					]
				}
			]
		})
		contacts = contacts
			.map(contact => contact.get({ plain: true }))
			.map(({ contact }) => contact)

		let members = await ChatPerUser.findAll({
			where: { chatId },
			include: [{ model: User, attributes: ['nickname', 'id', 'email'] }]
		})
		members = members.map(user => {
			const { User } = user.get({ plain: true })
			return User
		})

		const membersDictionary = new Map()

		members.forEach(member => {
			membersDictionary.set(member.id, member)
		})

		contacts = contacts.filter(contact => {
			if (!membersDictionary.has(contact.user.id)) {
				return contact
			}
		})

		return contacts
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function editContact(contact) {
	try {
		const updatedData = await Contact.update(contact, {
			where: {
				id: contact.id
			},
			returning: true
		})

		const { contact: editedContact } = (
			await ContactPerUser.findOne({
				where: {
					contactOwnerId: contact.contactOwnerId,
					contactId: contact.id
				},
				include: [
					{
						model: Contact,
						as: 'contact',
						include: [
							{
								model: User,
								as: 'user',
								attributes: ['nickname', 'id', 'email']
							}
						]
					}
				]
			})
		)?.get({ plain: true })

		return editedContact
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function addContact(contact, user) {
	try {
		const contactId = uuidv4()
		await Contact.create({
			id: contactId,
			name: contact.nickname,
			userId: contact.id
		})

		const uuid = uuidv4()
		await ContactPerUser.create({
			id: uuid,
			contactOwnerId: user.id,
			contactId: contactId
		})
		const { contact: addedContact } = (
			await ContactPerUser.findOne({
				where: { id: uuid },
				include: [
					{
						model: Contact,
						as: 'contact',
						include: [
							{
								model: User,
								as: 'user',
								attributes: ['nickname', 'id', 'email']
							}
						]
					}
				]
			})
		).get({ plain: true })

		return addedContact
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function deleteContact(contactId) {
	try {
		await ContactPerUser.destroy({
			where: {
				contactId
			}
		})
		await Contact.destroy({
			where: {
				id: contactId
			}
		})
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	getContactByUser,
	editContact,
	deleteContact,
	getContactsToAddInChat,
	addContact
}
