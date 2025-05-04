import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { catchError } from '../utils/error'
import { JwtCustomPayload } from '../types/jwt'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.cookies.token

	if (!token) {
		res.status(401).json({ success: false, message: "Unauthorized" })
		return
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtCustomPayload
		if (!decoded) {
			res.status(401).json({ success: false, message: "Unauthorized" })
			return
		}

		req.userId = decoded.userId
		next()
	} catch (error) {
		catchError(res, error)
	}
}