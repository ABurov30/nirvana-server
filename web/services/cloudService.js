const EasyYandexS3 = require('easy-yandex-s3').default
require('dotenv').config()

const s3 = new EasyYandexS3({
	auth: {
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY
	},
	Bucket: 'nirvana-tracks',
	debug: false
})

async function upload({ track, cover }) {
	try {
		let mp3 = await s3.Upload(
			{
				buffer: track
			},
			'/mp3/'
		)
		let img = await s3.Upload(
			{
				buffer: cover
			},
			'/img/'
		)
		if (mp3 && track) {
			return { img: img.Location, mp3: mp3.Location }
		} else {
			throw new Error('Couldn`t upload')
		}
	} catch (e) {
		console.error(e)
		throw e
	}
}

module.exports = {
	upload
}
