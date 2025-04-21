import express from 'express'
import { connect } from '../database/connection'
import dotenv from "dotenv"
dotenv.config()

const app = express()

connect()

app.listen(8080, () => {
	console.log("Server is running on port 8080")
})

