import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const db = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USR,
	password: process.env.MYSQL_PWD,
	database: process.env.MYSQL_DB
})

export const connectDB = async () => {
	try {
		await db.getConnection()
		console.log("Connected to database")
	} catch (error) {
		console.error("Conneciton error : ", error)
		process.exit(1)
	}
}