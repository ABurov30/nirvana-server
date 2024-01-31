async function checkImage(url) {
	return fetch(url)
		.then(response => {
			if (response.ok) {
				return true
			} else {
				return false
			}
		})
		.catch(error => {
			return false
		})
}

module.exports = checkImage
