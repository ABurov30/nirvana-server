const express = require('express')
const checkHealthController = express.Router()

checkHealthController.get('/', async (req, res, next) => {
	try {
		res.sendStatus(200)
	} catch (e) {
		next(e)
	}
})

module.exports = checkHealthController
