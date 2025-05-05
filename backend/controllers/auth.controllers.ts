import { Request, Response } from 'express'
import bcrypt from "bcrypt"
import { generateVerificationToken } from '../utils/generateVerificationToken'
import { generateJWTToken } from '../utils/generateJWTToken'
import { User } from '../models/user'
import { sendChangeEmailCode, sendResetPasswordEmail, sendResetSuccessEmail, sendVerificationEmail } from '../resend/email'
import crypto from 'crypto'
import { catchError } from '../utils/error'
import mongoose from 'mongoose'
import { ChangeEmailRequest } from '../models/changeEmailRequest'

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
			res.status(400).json({ success: false, message: "Adresse mail ou mot de passe incorrect" })
			return
		}
		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			res.status(400).json({ success: false, message: "Adresse mail ou mot de passe incorrect" })
			return
		}

		if (!user.isVerified) {
			res.status(400).json({ success: false, message: "E-mail non vérifié" })
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
			res.status(400).json({ success: false, message: "Code invalide ou exipiré" })
			return
		}

		const tokenExpiration = user.verificationTokenExpiresAt
		if (tokenExpiration && tokenExpiration < new Date(Date.now())) {
			const verificationToken = generateVerificationToken()

			user.verificationToken = verificationToken
			user.verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
			await user.save()

			await sendVerificationEmail(user.email, verificationToken)

			res.status(400).json({ success: false, message: "Code expiré, un nouveau code de vérification a été envoyé" })
			return
		}

		if (tokenExpiration && code === user.verificationToken) {

			user.isVerified = true
			user.verificationToken = undefined
			user.verificationTokenExpiresAt = undefined

			await user.save()

			generateJWTToken(res, user._id.toString());
		} else {
			res.status(400).json({ success: false, message: "Code de vérification invalide" })
			return
		}

		// Possibilité d'envoyer un mail de bienvenue

		res.status(200).json({ success: true, message: 'Email vérifié avec succès' })
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
		const resetPasswordExpiresAt = new Date(Date.now() + 20 * 60 * 1000) // 20m

		user.resetPasswordToken = resetPasswordToken
		user.resetPasswordExpiresAt = resetPasswordExpiresAt

		await user.save()
		const response = await sendResetPasswordEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`)
		if (!response.success) {
			res.status(400).json({ success: false, message: "Le mail n'a pas été envoyé" })
			return
		}

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
			res.status(400).json({ success: false, message: "Lien invalide ou expiré" })
			return
		}

		const hashedPassword = await bcrypt.hash(password, 10)
		user.password = hashedPassword
		user.resetPasswordToken = undefined
		user.resetPasswordExpiresAt = undefined

		await user.save()

		await sendResetSuccessEmail(user.email)

		res.status(200).json({ success: true, message: "Mot de passe rinitialisé avec succès" })
	} catch (error) {
		catchError(res, error)
	}
}

export const resendVerificationEmail = async (req: Request, res: Response) => {
	try {
		const { email } = req.body

		const verificationToken = generateVerificationToken()
		const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)

		const user = await User.findOne({ email })

		if (!user) {
			res.status(400).json({ success: false, message: "L'utilisateur n'existe pas" })
			return
		}

		user.verificationToken = verificationToken
		user.verificationTokenExpiresAt = verificationTokenExpiresAt

		await user.save()
		await sendVerificationEmail(user.email, verificationToken)

		res.status(200).json({ success: true, message: "Email de vérification envoyé" })
	} catch (error) {
		catchError(res, error)
	}
}

export const checkAuth = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.userId)

		if (!user) {
			res.status(400).json({ success: false, message: "Aucun utilisateur trouvé" })
			return
		}

		res.status(200).json({ success: true, user: { ...user.toObject(), password: undefined } })
	} catch (error) {
		catchError(res, error)
	}
}

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const { userid } = req.params

		if (!mongoose.Types.ObjectId.isValid(userid)) {
			res.status(400).json({ success: false, message: "Format d'identifiant utilisateur invalide" });
			return
		}

		const deleteUser = await User.findByIdAndDelete(userid)

		if (!deleteUser) {
			res.status(404).json({ success: false, message: "Aucun utilisateur trouvé" })
			return
		}
		res.status(200).json({ success: true, message: "Utilisateur supprimé" })
	} catch (error) {
		catchError(res, error)
	}
}

export const updateFirstName = async (req: Request, res: Response) => {
	try {
		const { userid } = req.params
		const user = await User.findById(userid)
		const { firstName } = req.body
		if (!user) {
			res.status(400).json({ success: false, message: "Aucun utilisateur trouvé" })
			return
		}

		if (!firstName) {
			res.status(400).json({ success: false, message: "Données manquantes" })
			return
		}

		if (user.firstName !== firstName) {
			user.firstName = firstName
			user.save()
		}

		res.status(200).json({ success: true, message: "Données modifiées" })
	} catch (error) {
		catchError(res, error)
	}
}

export const updateEmail = async (req: Request, res: Response) => {
	try {
		const { userid } = req.params
		const { email } = req.body

		if (!email || !userid) {
			res.status(400).json({ message: "Données manquantes" })
			return
		}

		const emailAlreadyExists = await User.findOne({ email });
		if (emailAlreadyExists) {
			res.status(400).json({ success: false, message: "Cet email est déjà utilisé" });
			return
		}

		let changingEmail = await ChangeEmailRequest.findOne({ email })
		const verificationToken = generateVerificationToken()
		if (changingEmail) {
			if (changingEmail.userId.toString() === userid) {
				changingEmail.verificationToken = verificationToken
				changingEmail.verificationTokenExpiresAt = new Date(Date.now() + 20 * 60 * 1000)
			} else {
				res.status(400).json({ success: false, message: "Cet email est déjà utilisé" })
				return
			}
		} else {
			changingEmail = new ChangeEmailRequest({
				userId: userid,
				email,
				verificationToken,
				verificationTokenExpiresAt: new Date(Date.now() + 20 * 60 * 1000)
			});
		}

		await changingEmail.save()

		const response = await sendChangeEmailCode(email, verificationToken)
		if (!response.success && response.message === "Impossible d'envoyer l'e-mail de vérification") {
			await changingEmail.deleteOne({ _id: changingEmail._id })
			res.status(400).json(response)
			return
		}
		res.status(200).json({ success: true, message: "E-mail de vérification envoyé à la nouvelle adresse e-mail" })
	} catch (error) {
		catchError(res, error)
	}
}

export const verifyNewEmail = async (req: Request, res: Response) => {
	try {
		const { userid } = req.params
		const { code } = req.body
		const changeEmailRequest = await ChangeEmailRequest.findOne({ userId: userid, verificationToken: code })
		if (!changeEmailRequest) {
			res.status(400).json({ success: false, message: "Code invalide ou expiré" })
			return
		}

		if (changeEmailRequest.verificationTokenExpiresAt < new Date(Date.now())) {
			res.status(400).json({ success: false, message: "Code invalide ou expiré" })
			return
		}

		const user = await User.findById(userid)
		if (!user) {
			res.status(400).json({ success: false, message: "Utilisateur introuvable" })
			return
		}

		user.email = changeEmailRequest.email
		await user.save()

		await ChangeEmailRequest.deleteOne({ _id: changeEmailRequest._id })

		res.status(200).json({ success: true, message: "E-mail modifié" })
	} catch (error) {
		catchError(res, error)
	}
}

export const updatePassword = async (req: Request, res: Response) => {
	try {
		const { userid } = req.params
		const { ancientPassword, newPassword } = req.body
		const user = await User.findById(userid)

		if (!user) {
			res.status(400).json({ success: false, message: "Aucun utilisateur trouvé" })
			return
		}

		if (!ancientPassword || !newPassword) {
			res.status(400).json({ success: false, message: "Données manquantes" })
		}

		const isPasswordValid = await bcrypt.compare(ancientPassword, user.password)

		if (!isPasswordValid) {
			res.status(400).json({ success: false, message: "Ancien mot de passe incorrect" })
			return
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10)
		user.password = hashedPassword
		await user.save()

		res.status(200).json({ success: true, message: "Mot de passe modifié" })
	} catch (error) {
		catchError(res, error)
	}
}

