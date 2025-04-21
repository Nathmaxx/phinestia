import { Request, Response } from 'express'
import bcrypt from "bcrypt"
import { generateVerificationToken } from '../utils/generateVerificationToken'
import { generateJWTToken } from '../utils/generateJWTToken'
import { User } from '../model/user'

export const signup = async (req: Request, res: Response) => {
	const { firstName, email, password } = req.body

	try {
		if (!email || !password || !firstName) {
			res.status(400).json({ message: "All fields are required" })
			return
		}

		const userAlreadyExists = await User.findOne({ email });
		if (userAlreadyExists) {
			res.status(400).json({ message: "User already exists" });
			return
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		const verificationToken = generateVerificationToken()

		const user = new User({
			firstName,
			email,
			password: hashedPassword,
			verificationToken: verificationToken,
			verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
		});

		await user.save();

		generateJWTToken(res, user._id.toString());
		const userObject = user.toJSON()
		res.status(201).json({ success: true, message: "User created successfully", user: { ...userObject, password: undefined } })
		return
	} catch (error) {
		res.status(500).json({ success: false, message: error })
	}
}

export const login = (req: Request, res: Response) => {

}

export const logout = (req: Request, res: Response) => {

}