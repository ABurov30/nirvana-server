const { ContactPerUser, User, Contact } = require('../../db/models')
const { v4: uuidv4 } = require('uuid')

async function getContactByUser(contactOwnerId) {
	console.log('🚀 ~ getContactByUser ~ contactOwnerId:', contactOwnerId)
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

async function editContact(contact) {
	try {
		await Contact.update(contact, {
			where: {
				id: contact.id
			}
		})
		const { contact: editedContact } = (
			await ContactPerUser.findOne({
				where: { contactOwnerId: contact.contactOwnerId },
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

		return editedContact
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function addContact(contact, user) {
	try {
		const res = await Contact.create({
			id: uuidv4(),
			name: contact.nickname,
			userId: contact.id
		})
		console.log(res, 'res -=--------')
		const uuid = uuidv4()
		await ContactPerUser.create({
			id: uuid,
			contactOwnerId: user.id,
			contactId: res.dataValues.id
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
	addContact
}
