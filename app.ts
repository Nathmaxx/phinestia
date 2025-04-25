import express from 'express'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes'
import { databaseConnection } from './database/dbConnection'


dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
	origin: 'http://localhost:5173', // URL de votre frontend Vite
	credentials: true, // Important pour les cookies/authentification
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/auth', authRoutes)

databaseConnection()

app.listen(8080, () => {
	console.log("Server is running on port 8080")
})

