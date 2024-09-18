const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const session = require('express-session')
const store = require('session-file-store')
const http = require('http')
const { Server } = require('socket.io')

const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const {
	ApolloServerPluginDrainHttpServer
} = require('@apollo/server/plugin/drainHttpServer')

const authController = require('./web/controllers/authController')
const promoController = require('./web/controllers/promoController')
const radioController = require('./web/controllers/radioController')
const tracksController = require('./web/controllers/tracksController')
const favoriteController = require('./web/controllers/favoriteController')
const checkHealthController = require('./web/controllers/checkHealthController')

const helmet = require('helmet')
const { errorHandler } = require('./web/middleware/errorHandler')
require('dotenv').config()
const { config } = require('dotenv')
const {
	onConnection,
	socketController
} = require('./web/controllers/socketController')
const { resolvers } = require('./web/utils/resolver')
const { typeDefs } = require('./web/schema/typeDefs')

async function startServer() {
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
			maxAge: 1000 * 60 * 60,
			httpOnly: true
		}
	}

	app.use(cors({ credentials: true, origin: true }))

	app.use(helmet({ contentSecurityPolicy: false }))
	app.use(session(sessionConfig))
	app.use(morgan('dev'))
	app.use(express.json())

	const httpServer = http.createServer(app)

	const io = new Server(httpServer, {
		cors: {
			credentials: true
		}
	})

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		introspection: process.env.NODE_ENV !== 'production',
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
	})

	await server.start()

	io.on('connection', socket => {
		socketController(socket)
	})

	app.use('/api/checkHealth', checkHealthController)
	app.use('/api/radio', radioController)
	app.use('/api/auth', authController)
	app.use('/api/promo', promoController)
	app.use('/api/track', tracksController)
	app.use('/api/favorite', favoriteController)

	app.use(
		'/graphql',
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => ({
				request: req,
				response: res
			})
		})
	)

	app.use(errorHandler)

	httpServer.listen(PORT, () =>
		console.log(`Server has started on PORT ${PORT}`)
	)
}

startServer()
