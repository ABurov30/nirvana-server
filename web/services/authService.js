const bcrypt = require('bcrypt')
const { User } = require('../../db/models')
const crypto = require('crypto')
const changePassword = require('../mails/changePassword')
const mailerService = require('../services/mailerService')
const confirmEmail = require('../mails/confirmEmail')
const { v4: uuidv4 } = require('uuid')

async function signup(nickname, email, password) {
	try {
		const hashpass = await bcrypt.hash(password, 10)
		const confirmationCode = crypto.randomBytes(20).toString('hex')

		const [foundUser, created] = await User.findOrCreate({
			where: { email },
			defaults: {
				nickname,
				hashpass,
				id: uuidv4(),
				confirmationCode
			}
		})

		if (!created && !foundUser.confirmed)
			throw new Error('Confirm your e-mail')

		if (!created) throw new Error('Email is in use')

		const { id } = foundUser
		const userWithoutPass = {
			id,
			nickname,
			email,
			confirmationCode
		}

		await mailerService.sendEmail(
			userWithoutPass,
			confirmEmail(confirmationCode)
		)
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function login(email, password) {
	try {
		const foundUser = await User.findOne({ where: { email } })

		if (!foundUser) {
			throw new Error('No such email')
		}

		if (!foundUser.confirmed) {
			throw new Error('Email not confirmed')
		}

		if (await bcrypt.compare(password, foundUser.hashpass)) {
			const { id, nickname, email, confirmed, isAdmin } = foundUser
			const userWithoutPassword = {
				id,
				nickname,
				email,
				confirmed,
				isAdmin
			}
			return userWithoutPassword
		}

		throw new Error('Wrong password')
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function confirm(confirmationCode) {
	try {
		const foundUser = await User.findOne({ where: { confirmationCode } })

		if (!foundUser) {
			throw new Error('Wrong confirmation code')
		}

		foundUser.confirmed = true
		await User.update({ confirmed: true }, { where: { id: foundUser.id } })

		return foundUser
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function deleteUser(userId) {
	try {
		await User.destroy({ where: { id: userId } })
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function editUserInfo(name, mail, userId) {
	try {
		console.log(name, mail, 'email')
		const foundUser = await User.findOne({
			where: {
				id: userId
			}
		})
		foundUser.update({ email: mail, nickname: name })
		const { id, nickname, email, confirmed } = foundUser.dataValues
		const userWithoutPassword = { id, nickname, email, confirmed }
		return userWithoutPassword
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function findEmail(email) {
	try {
		const foundUser = await User.findOne({ where: { email } })

		if (!foundUser) {
			throw new Error('No such e-mail')
		}

		const confirmationCode = Math.floor(100000 + Math.random() * 900000)

		foundUser.confirmationCode = confirmationCode
		await User.update(
			{ confirmationCode: String(confirmationCode) },
			{ where: { id: foundUser.id } }
		)

		await mailerService.sendEmail(
			foundUser,
			changePassword(confirmationCode)
		)
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function reset(confirmationCode) {
	try {
		const user = await User.findOne({
			where: { confirmationCode }
		})
		return user
	} catch (e) {
		console.error(e)
		throw e
	}
}

async function newPassword(password, userId) {
	try {
		const hashpass = await bcrypt.hash(password, 10)
		await User.update({ hashpass }, { where: { id: userId } })
		const foundUser = await User.findOne({ where: { id: userId } })
		const { id, nickname, email, confirmed, isAdmin } = foundUser.dataValues
		const userWithoutPassword = { id, nickname, email, confirmed, isAdmin }
		return userWithoutPassword
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	signup,
	login,
	confirm,
	findEmail,
	reset,
	newPassword,
	deleteUser,
	editUserInfo
}
