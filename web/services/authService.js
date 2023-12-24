const bcrypt = require('bcrypt')
const { User } = require('../../db/models')
const { v4: uuidv4 } = require('uuid')

async function signup(nickname, email, password) {
	try {
		const hashpass = await bcrypt.hash(password, 10)

		const [foundUser, created] = await User.findOrCreate({
			where: { email },
			defaults: {
				nickname,
				hashpass,
				id: uuidv4()
			}
		})

		return { foundUser, created }
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

		if (await bcrypt.compare(password, foundUser.hashpass)) {
			const { id, nickname, email } = foundUser
			const userWithoutPass = { id, nickname, email }
			return userWithoutPass
		}

		throw new Error('Wrong password')
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	signup,
	login
}
