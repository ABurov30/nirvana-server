const favoriteService = require('../services/favoriteService')

async function toClient(tracks, type, userId) {
	try {
		if (!tracks) return []
		res = await Promise.all(
			tracks?.map(async track => {
				const isLiked = await favoriteService.check({
					trackId: type === 'track' ? track?.id : null,
					radioId: type === 'radio' ? track?.id : null,
					userId
				})
				return {
					id: track?.id,
					title: track?.name,
					subTitle: track?.artist,
					url: track?.url,
					img: track?.favicon,
					type: type,
					isLiked: isLiked
				}
			})
		)
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	toClient
}
