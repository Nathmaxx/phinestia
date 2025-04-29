import { Request, Response } from 'express'
import bcrypt from "bcrypt"
import { generateVerificationToken } from '../utils/generateVerificationToken'
import { generateJWTToken } from '../utils/generateJWTToken'
import { User } from '../model/user'
import { sendResetPasswordEmail, sendResetSuccessEmail, sendVerificationEmail } from '../resend/email'
import crypto from 'crypto'
import { catchError } from '../utils/error'

export const signup = async (req: Request, res: Response) => {
	const { firstName, email, password } = req.body

	try {
		if (!email || !password || !firstName) {
			res.status(400).json({ message: "Tous les champs sont requis" })
			return
		}

		const userAlreadyExists = await User.findOne({ email });

		if (userAlreadyExists) {
			res.status(400).json({ success: false, message: "Un utilisateur possède déjà cet e-mail" });
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

		const response = await sendVerificationEmail(user.email, verificationToken)
		if (!response.success && response.message === "Impossible d'envoyer l'e-mail de vérification") {
			await User.deleteOne({ _id: user._id })
			res.status(400).json(response)
			return
		}

		const userObject = user.toJSON()
		res.status(201).json({ success: true, message: "Utilisateur crée avec succès", user: { ...userObject, password: undefined } })
		return
	} catch (error) {
		catchError(res, error)
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

		user.lastLogin = new Date(Date.now())

		await user.save()

		generateJWTToken(res, user._id.toString())

		const userInfos = {
			id: user._id,
			email: user.email,
			firstName: user.firstName,
			isVerified: user.isVerified
		}

		res.status(200).json({ success: true, message: "Login successful", user: userInfos })
	} catch (error) {
		catchError(res, error)
	}
}

export const logout = async (_: Request, res: Response) => {
	res.clearCookie('token')
	res.status(200).json({ success: true, message: "Logged out successfully" })
}

export const verifyEmail = async (req: Request, res: Response) => {
	const { code, email } = req.body

	try {
		const user = await User.findOne({
			verificationToken: code,
			email,
		})

		if (!user) {
			res.status(400).json({ success: false, message: "Code invalide" })
			return
		}

		const tokenExpiration = user.verificationTokenExpiresAt
		if (tokenExpiration && tokenExpiration > new Date(Date.now())) {
			const verificationToken = generateVerificationToken()

			user.verificationToken = verificationToken
			await user.save()

			await sendVerificationEmail(user.email, verificationToken)

			res.status(400).json({ success: false, message: "Code expiré, un nouveau code de vérification a été envoyé" })
			return
		}

		user.isVerified = true
		user.verificationToken = undefined
		user.verificationTokenExpiresAt = undefined

		await user.save()

		generateJWTToken(res, user._id.toString());

		// Possibilité d'envoyer un mail de bienvenue

		res.status(200).json({ success: true, message: 'Email verified successfully' })
	} catch (error) {
		catchError(res, error)
	}
}

export const forgotPassword = async (req: Request, res: Response) => {
	const { email } = req.body
	try {
		const user = await User.findOne({ email })

		if (!user) {
			res.status(400).json({ success: false, message: "User not found" })
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
		catchError(res, error)
	}
}

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { token } = req.params
		const { password } = req.body

		const user = await User.findOne({
			resetPasswordToken: token,
			resetPasswordExpiresAt: { $gt: Date.now() }
		})

		if (!user) {
			res.status(400).json({ success: false, message: "Invalid or expired reset token" })
			return
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		user.password = hashedPassword
		user.resetPasswordToken = undefined
		user.resetPasswordExpiresAt = undefined

		await user.save()

		await sendResetSuccessEmail(user.email)

		res.status(200).json({ success: true, message: "Password reset successfully" })
	} catch (error) {
		catchError(res, error)
	}
}

export const checkAuth = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.userId)

		if (!user) {
			res.status(400).json({ success: false, message: "" })
			return
		}

		res.status(200).json({ success: true, user: { ...user.toObject(), password: undefined } })
	} catch (error) {
		catchError(res, error)
	}
}

export const deleteUser = async (req: Request, res: Response) => {
	try {

	} catch (error) {

	}
}
