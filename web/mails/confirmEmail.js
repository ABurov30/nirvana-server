const confirmEmail = uuid => {
	return {
		subject: 'Код подтверждения',
		html: `<p>Перейди по ссылке для завершения регистрации: 
    <a href="http://localhost:3003/api/auth/confirm/${uuid}">ссылка для подверждения</a>`
	}
}

module.exports = confirmEmail
