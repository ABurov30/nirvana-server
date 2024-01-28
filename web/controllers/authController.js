const express = require('express')
const authService = require('../services/authService')
require('dotenv').config()

const authController = express.Router()

authController.post('/signup', async (req, res, next) => {
	try {
		const { nickname, email, password } = req.body
		await authService.signup(nickname, email, password)
		return res.status(200).json('Email sent successfully')
	} catch (e) {
		res.status(500).json('Error sign up: ' + e.message)
	}
})

authController.delete('/', async (req, res, next) => {
	try {
		const { userId } = req.body
		await authService.deleteUser(userId)
		req.session.destroy()
		res.clearCookie('user_id')
		res.sendStatus(200)
	} catch (e) {
		next(e)
	}
})

authController.put('/userInfo', async (req, res, next) => {
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
		next(e)
	}
})

authController.get('/confirm/:confirmationCode', async (req, res, next) => {
	try {
		const { confirmationCode } = req.params
		const foundUser = await authService.confirm(confirmationCode)
		req.session.user = foundUser
		res.redirect(process.env.FRONT_BASE_URL)
	} catch (e) {
		next(e)
	}
})

authController.post('/login', async (req, res, next) => {
	try {
		const { email, password } = req.body
		const userWithoutPass = await authService.login(email, password)
		req.session.user = userWithoutPass
		return res.json(userWithoutPass)
	} catch (e) {
		res.status(500).json('Error login: ' + e.message)
	}
})

authController.get('/logout', (req, res, next) => {
	try {
		req.session.destroy()
		res.clearCookie('user_id')
		res.sendStatus(200)
	} catch (e) {
		next(e)
	}
})

authController.get('/check', async (req, res, next) => {
	try {
		console.log(req.session)
		if (req.session?.user?.id) {
			return res.json(req.session.user)
		}
		return res.status(401).send('Unauthorized')
	} catch (e) {
		next(e)
	}
})

authController.post('/findEmail', async (req, res, next) => {
	try {
		const { email } = req.body
		await authService.findEmail(email)
		return res
			.status(200)
			.json('E-mail sent successfully. Check it to reset password')
	} catch (e) {
		next(e)
	}
})

authController.get('/reset/:confirmationCode', async (req, res, next) => {
	try {
		const { confirmationCode } = req.params

		const user = await authService.reset(confirmationCode)
		if (user) {
			res.status(200).json({ userId: user.id })
		} else {
			res.status(401).json('Wrong code, please try again')
		}
	} catch (e) {
		next(e)
	}
})

authController.post('/newPassword', async (req, res, next) => {
	try {
		const { password, userId } = req.body
		const user = await authService.newPassword(password, userId)
		req.session.user = user
		return res.json(user)
	} catch (e) {
		next(e)
	}
})

module.exports = authController
