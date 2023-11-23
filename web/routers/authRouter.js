const express = require('express')
const bcrypt = require('bcrypt')
const { User } = require('../../db/models')
const authService = require('../services/authService')

const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
	try {
		const { nickname, email, password } = req.body

		const { foundUser, created } = await authService.signup(
			nickname,
			email,
			password
		)

		if (!created) return res.status(401).send('Email is in use')

		const { id } = foundUser
		const userWithoutPass = { id, nickname, email }

		req.session.user = userWithoutPass

		return res.json(userWithoutPass)
	} catch (e) {
		console.log(e)
	}
})

authRouter.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body

		const userWithoutPass = await authService.login(email, password)

		req.session.user = userWithoutPass

		return res.json(userWithoutPass)
	} catch (e) {
		console.log(e)
		return res.status(401).send(e.message)
	}
})

authRouter.get('/logout', (req, res) => {
	try {
		req.session.destroy()
		res.clearCookie('user_sid')
		res.sendStatus(200)
	} catch (e) {
		console.log(e)
	}
})

authRouter.get('/check', async (req, res) => {
	try {
		if (req.session?.user?.id) {
			return res.json(req.session.user)
		}
		return res.status(401).send('Unauthorized')
	} catch (e) {
		console.log(e)
	}
})

module.exports = authRouter
