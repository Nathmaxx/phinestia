import { resend } from "./config"

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
	try {
		await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: [email],
			subject: "Vérifier votre adresse email",
			html: `Finalisez la création de votre compte financia avec le code suivant : ${verificationToken}`
		})

	} catch (error) {
		console.log("Error sending verification email", error)
	}
}

export const sendResetPasswordEmail = async (email: string, resetUrl: string) => {
	try {
		await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: [email],
			subject: "Changer votre mot de passe",
			html: `Cliquez sur le lien suivant pour reinitialiser votre mot de passe : <a href="${resetUrl}">Changer votre mot de passe</a>`
		})

	} catch (error) {
		console.log("Error sending password reset email", error)
	}
}

export const sendResetSuccessEmail = async (email: string) => {
	try {
		await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: [email],
			subject: "Password reinitialisé avec succès",
			html: `Votre mot de passe a été modifié.`
		})

	} catch (error) {
		console.log("Error sending password reset successful email", error)
	}
}