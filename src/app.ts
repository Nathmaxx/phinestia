import express from 'express'
import dotenv from "dotenv"
import authRoutes from '../routes/auth.routes'
import { connectDB } from '../database/connection'
dotenv.config()

const app = express()
app.use(express.json())


app.use('/api/auth', authRoutes)

connectDB()

app.listen(8080, () => {
	console.log("Server is running on port 8080")
})

