const changePassword = code => {
	return {
		subject: 'Код подтверждения',
		html: `<p>Ваш код смены пароля: ${code}"</p>`
	}
}

module.exports = changePassword
