const contactService = require('../services/contactService')
const { sequelize } = require('../../db/models')

async function getContactsByUser(request, response) {
	let result = {
		success: false,
		contacts: null,
		errors: null
	}
	try {
		const { id } = request?.body
		let contacts = await contactService.getContactByUser(id)
		console.log('🚀 ~ getContactsByUser ~ contacts:', contacts)
		if (contacts == null) {
			result.errors = {
				code: '200',
				message: 'No result'
			}
			result.success = true
		} else {
			result.contacts = contacts
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

async function editContact(request, response) {
	let result = {
		success: false,
		contacts: null,
		errors: null
	}
	try {
		const { contact } = request?.body
		let editedContact = await contactService.editContact(contact)
		if (editedContact == null) {
			result.errors = {
				code: '200',
				message: 'No result'
			}
			result.success = true
		} else {
			result.contact = editedContact
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

async function deleteContact(request, response) {
	let result = {
		success: false,
		contacts: null,
		errors: null
	}
	try {
		const { contactId } = request?.body
		await contactService.deleteContact(contactId)

		result.success = true
	} catch (error) {
		result.success = true
		result.errors = {
			code: '500',
			message: error.message
		}
	}
	return result
}

async function addContact(request, response) {
	let result = {
		success: false,
		contacts: null,
		errors: null
	}
	const t = await sequelize.transaction()
	try {
		const { contact, user } = request?.body
		let addedContact = await contactService.addContact(contact, user)
		if (addedContact == null) {
			result.errors = {
				code: '500',
				message: 'No result'
			}
			result.success = false
		} else {
			result.contact = addedContact
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
	getContactsByUser,
	editContact,
	deleteContact,
	addContact
}
