const changePassword = uuid => {
	return {
		subject: 'Код подтверждения',
		html: `<p>Перейди по этой разовой ссылке для изменения пароля: 
     <a href="http://localhost:3003/api/auth/reset/${uuid}">ссылка для подверждения</a>`
	}
}

module.exports = changePassword
