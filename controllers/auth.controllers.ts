import { Request, Response } from 'express'
import prisma from '../database/prisma'


export const signup = async (req: Request, res: Response) => {
	const { username, firstName, email, password } = req.body

	try {
		if (!username || !email || !password || !firstName) {
			return res.status(400).json({ message: "All fields are required" })
		}

		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [
					{ email },
					{ username }
				]
			}
		})


	} catch (error) {

	}
}

export const login = (req: Request, res: Response) => {

}

export const logout = (req: Request, res: Response) => {

}