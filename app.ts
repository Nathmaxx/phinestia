import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compression from "compression"
import helmet from 'helmet'
import authRoutes from './routes/auth.routes'
import rateLimit from 'express-rate-limit'
import categoryRoutes from './routes/category.routes'
import accountRoutes from './routes/account.routes'
import transactionRoutes from './routes/transaction.routes'
import { databaseConnection } from './database/dbConnection'


dotenv.config()


const app = express()
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(cookieParser())

const limiter = rateLimit({
	windowMs: 60 * 1000, // 15 minutes
	max: 20, // 100 requêtes par IP
});
app.use('/api/auth/', limiter);

app.use(cors({
	origin: 'http://localhost:5173', // URL de votre frontend Vite
	credentials: true, // Important pour les cookies/authentification
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/auth', authRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/transaction', transactionRoutes)

databaseConnection()

const PORT = process.env.PORT || 3000
app.listen(PORT || 3000, () => {
	console.log(`Server is running on port ${PORT}`)
})

