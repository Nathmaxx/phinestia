import jwt from 'jsonwebtoken'
import { Response } from 'express'

export const generateJWTToken = (res: Response, userId: string) => {
	try {
		const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
			expiresIn: "7d"
		})

		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: 'strict',
			maxAge: 7 * 24 * 60 * 60 * 1000
		})

		return token
	} catch (error) {
		console.error(error)
	}
}