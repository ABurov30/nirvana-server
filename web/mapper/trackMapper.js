const favoriteService = require('../services/favoriteService')

async function toClient(tracks, type, userId) {
	try {
		if (!tracks.length) return []
		const likedTracksIds = await favoriteService.checkIsLiked({
			type,
			userId
		})
		const res = tracks.map(track => {
			return {
				id: track?.id,
				title: track?.name,
				subTitle: type === 'track' ? track?.artist : track?.country,
				url: track?.url,
				img: track?.favicon,
				type: type,
				isLiked: likedTracksIds.has(track?.id)
			}
		})
		return res
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	toClient
}
