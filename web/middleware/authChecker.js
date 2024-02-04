require('dotenv').config()

function authChecker(req, res, next) {
	if (req.session?.user?.id) {
		next()
	} else {
		res.redirect(process.env.FRONT_BASE_URL + '/auth')
	}
}

module.exports = authChecker
