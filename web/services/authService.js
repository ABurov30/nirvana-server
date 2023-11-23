const bcrypt = require('bcrypt')
const { User } = require('../../db/models')

async function signup(nickname, email, password) {
	const hashpass = await bcrypt.hash(password, 10)
	const [foundUser, created] = await User.findOrCreate({
		where: { email },
		defaults: {
			nickname,
			hashpass
		}
	})

	return { foundUser, created }
}

async function login(email, password) {
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
}

module.exports = {
	signup,
	login
}
