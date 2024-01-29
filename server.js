const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const store = require('session-file-store')

const authController = require('./web/controllers/authController')
const promoController = require('./web/controllers/promoController')
const radioController = require('./web/controllers/radioController')
const tracksController = require('./web/controllers/tracksController')
const favoriteController = require('./web/controllers/favoriteController')

const helmet = require('helmet')
const { errorHandler } = require('./web/middleware/errorHandler')
require('dotenv').config()
const { config } = require('dotenv')
console.log(config())

const app = express()
const PORT = process.env.PORT || 3001

const FileStore = store(session)

const sessionConfig = {
	name: 'user_id',
	secret: process.env.SESSION_SECRET ?? 'test',
	resave: true,
	store: new FileStore(),
	saveUninitialized: false,
	cookie: {
		maxAge: 100,
		httpOnly: true,
		sameSite: 'none',
		secure: true,
		domain:
			process.env.NODE_ENV === 'development'
				? '.localhost'
				: '.nirvana-music.ru'
	}
}

app.use(
	cors({
		credentials: true,
		origin: true
	})
)
app.use(helmet())
app.use(session(sessionConfig))
app.use(morgan('dev'))
app.use(express.json())
app.use(errorHandler)

app.use('/api/radio', radioController)
app.use('/api/auth', authController)
app.use('/api/promo', promoController)
app.use('/api/track', tracksController)
app.use('/api/favorite', favoriteController)

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`))
