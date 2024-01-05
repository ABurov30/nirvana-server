const express = require('express')
const authService = require('../services/authService')

const authController = express.Router()

authController.post('/signup', async (req, res) => {
	try {
		const { nickname, email, password } = req.body
		await authService.signup(nickname, email, password)
		return res.status(200).json('Email sent successfully')
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(401).json(e.message)
	}
})

authController.delete('/', async (req, res) => {
	try {
		const { userId } = req.body
		await authService.deleteUser(userId)
		req.session.destroy()
		res.clearCookie('user_id')
		res.sendStatus(200)
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(401).json(e.message)
	}
})

authController.put('/userInfo', async (req, res) => {
	try {
		const { nickname, email, userId } = req.body
		const userWithoutPass = await authService.editUserInfo(
			nickname,
			email,
			userId
		)
		req.session.user = userWithoutPass
		res.json(userWithoutPass)
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(401).json(e.message)
	}
})

authController.get('/confirm/:confirmationCode', async (req, res) => {
	try {
		const { confirmationCode } = req.params
		const foundUser = await authService.confirm(confirmationCode)
		req.session.user = foundUser
		res.redirect('http://localhost:5173')
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(401).json(e.message)
	}
})

authController.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const userWithoutPass = await authService.login(email, password)
		req.session.user = userWithoutPass
		return res.json(userWithoutPass)
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(401).json(e.message)
	}
})

authController.get('/logout', (req, res) => {
	try {
		req.session.destroy()
		res.clearCookie('user_id')
		res.sendStatus(200)
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(401).send(e.message)
	}
})

authController.get('/check', async (req, res) => {
	try {
		if (req.session?.user?.id) {
			return res.json(req.session.user)
		}
		return res.status(401).send('Unauthorized')
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(401).send(e.message)
	}
})

authController.post('/findEmail', async (req, res) => {
	try {
		const { email } = req.body
		await authService.findEmail(email)
		return res
			.status(200)
			.json('E-mail sent successfully. Check it to reset password')
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(401).send(e.message)
	}
})

authController.get('/reset/:confirmationCode', async (req, res) => {
	try {
		const { confirmationCode } = req.params

		const user = await authService.reset(confirmationCode)
		if (user) {
			res.status(200).json({ userId: user.id })
		} else {
			res.status(401).json('Wrong code, please try again')
		}
	} catch (e) {
		console.error('Ошибка:', e)
		return res.status(401).send(e.message)
	}
})

authController.post('/newPassword', async (req, res) => {
	try {
		const { password, userId } = req.body
		const user = await authService.newPassword(password, userId)
		req.session.user = user
		return res.json(user)
	} catch (e) {
		console.error(e)
		return res.status(401).send(e.message)
	}
})

module.exports = authController
