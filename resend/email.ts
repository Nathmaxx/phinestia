import { resend } from "./config"

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
	try {
		const { error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: [email],
			subject: "Vérifier votre adresse email",
			html: `Finalisez la création de votre compte financia avec le code suivant : ${verificationToken}`
		})

		if (error) {
			return { success: false, message: "Impossible d'envoyer l'e-mail de vérification" }
		}
		return { success: true, message: "Email envoyé" }
	} catch (error) {
		return { success: false, message: "Impossible d'envoyer l'e-mail de vérification. Veuillez réessayer dans quelques minutes" }
	}
}

export const sendResetPasswordEmail = async (email: string, resetUrl: string) => {
	try {
		const { error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: [email],
			subject: "Changer votre mot de passe",
			html: `Cliquez sur le lien suivant pour reinitialiser votre mot de passe : <a href="${resetUrl}">Changer votre mot de passe</a>`
		})

		if (error) {
			return { success: false, message: "Impossible d'envoyer l'e-mail de reinitialisation" }
		}

		return { success: true, message: "Mail envoyé" }
	} catch (error) {
		return { success: true, message: "Error durant l'envoi du mot de passe de réinitialisation" }
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