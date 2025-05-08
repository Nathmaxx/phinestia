import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import accountRoutes from './routes/account.routes'
import transactionRoutes from './routes/transaction.routes'
import { databaseConnection } from './database/dbConnection'
import compression from 'compression'
import helmet from 'helmet'
import { Request, Response } from 'express'

dotenv.config()

const requiredEnvVars = ['JWT_SECRET', 'MONGO_URI', 'RESEND_API_KEY', 'CLIENT_URL'];
const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
	console.error(`Variables d'environnement manquantes: ${missingVars.join(', ')}`);
	process.exit(1);
}

const app = express()

app.set('trust proxy', 1);

app.use(cors({
	origin: [process.env.CLIENT_URL],
	credentials: true, // Important pour les cookies/authentification
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(cookieParser())
app.use(compression())

app.use(express.json({ limit: '10kb' }))

app.use('/api/auth', authRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/transaction', transactionRoutes)

app.get('/health', (_: Request, res: Response) => {
	res.status(200).json({ status: 'success', message: 'Server is running' })
})

app.use((_: Request, res: Response) => {
	res.status(404).json({
		status: 'fail',
		message: 'Route not found'
	})
})

databaseConnection()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log("Server is running")
})

