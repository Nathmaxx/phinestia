import { Request, Response } from 'express'
import bcrypt from "bcrypt"
import { generateVerificationToken } from '../utils/generateVerificationToken'
import { generateJWTToken } from '../utils/generateJWTToken'
import { User } from '../model/user'
import { sendResetPasswordEmail, sendVerificationEmail } from '../resend/email'
import crypto from 'crypto'

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
			verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
		});

		await user.save();

		generateJWTToken(res, user._id.toString());

		await sendVerificationEmail(user.email, verificationToken)

		const userObject = user.toJSON()
		res.status(201).json({ success: true, message: "User created successfully", user: { ...userObject, password: undefined } })
		return
	} catch (error) {
		res.status(500).json({ success: false, message: error })
	}
}

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body
	try {
		const user = await User.findOne({ email })

		if (!user) {
			res.status(400).json({ success: false, message: "Invalid credentials" })
			return
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			res.status(400).json({ success: false, message: "Invalid credentials" })
			return
		}

		if (!user.isVerified) {
			res.status(400).json({ success: false, message: "Email not verified" })
			return
		}

		generateJWTToken(res, user._id.toString())

		res.status(200).json({ success: true, message: "Login successfull" })
	} catch (error) {
		console.log("Error logging in : ", error)
		if (error instanceof Error) {
			res.status(500).json({ success: false, message: error.message });
		} else {
			res.status(500).json({ success: false, message: String(error) });
		}
	}
}

export const logout = async (_: Request, res: Response) => {
	res.clearCookie('token')
	res.status(200).json({ success: true, message: "Logged out successfully" })
}

export const verifyEmail = async (req: Request, res: Response) => {
	const { code } = req.body

	try {
		const user = await User.findOne({
			verificationToken: code,
			verificationTokenExpiresAt: { $gt: Date.now() }
		})

		if (!user) {
			res.status(400).json({ success: false, message: "Invalid or expired" })
			return
		}

		user.isVerified = true
		user.verificationToken = undefined
		user.verificationTokenExpiresAt = undefined

		await user.save()

		// Possibilité d'envoyer un mail de bienvenue

		res.status(200).json({ success: true, message: 'Email verified successfully' })
	} catch (error) {
		console.error(error)
	}
}

export const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body
	try {
		const user = await User.findOne({ email })

		if (!user) {
			res.status(400).json({ sucess: false, message: "User not found" })
			return
		}

		const resetPasswordToken = crypto.randomBytes(32).toString("hex")
		const resetPasswordExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1h

		user.resetPasswordToken = resetPasswordToken
		user.resetPasswordExpiresAt = resetPasswordExpiresAt

		await user.save()
		await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)

		res.status(200).json({ success: true, message: "Password reset email sent successfully" })
	} catch (error) {
		console.log("Error logging in : ", error)
		if (error instanceof Error) {
			res.status(500).json({ success: false, message: error.message });
		} else {
			res.status(500).json({ success: false, message: String(error) });
		}
	}
}
