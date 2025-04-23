import express from 'express'
import dotenv from "dotenv"
import authRoutes from './routes/auth.routes'
import { databaseConnection } from './database/dbConnection'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)

databaseConnection()

app.listen(8080, () => {
	console.log("Server is running on port 8080")
})

