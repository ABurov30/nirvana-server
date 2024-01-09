const nodemailer = require('nodemailer')

async function sendEmail(user, mail) {
	try {
		const mailOptions = mail
		mailOptions.to = user.email
		mailOptions.from = 'nirvanaMusicApp@yandex.ru'

		const transporter = nodemailer.createTransport({
			host: 'smtp.yandex.ru',
			port: 465,
			secure: true,
			auth: {
				user: 'nirvanaMusicApp',
				pass: 'dejcbhxcdzldofzx'
			}
		})

		await transporter.sendMail(mailOptions)
	} catch (e) {
		console.error('Ошибка:', e)
		throw e
	}
}

module.exports = {
	sendEmail
}
