import { resend } from "./config"

export const sendVerificationEmail = async (email: string, verificationToken: string) => {
	try {
		const { error } = await resend.emails.send({
			from: "Phinestia <no-reply@phinestia.fr>",
			to: [email],
			subject: "Vérifier votre adresse email",
			html: `Finalisez la création de votre compte Phinestia avec le code suivant : ${verificationToken}`
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
			from: "Phinestia <no-reply@phinestia.fr>",
			to: [email],
			subject: "Changer votre mot de passe",
			html: `Cliquez sur le lien suivant pour reinitialiser votre mot de passe : <a href="${resetUrl}">Changer votre mot de passe</a>
			<p>Ce lien est valide pendant 20 minutes</p>
			`
		})

		if (error) {
			return { success: false, message: "Impossible d'envoyer l'e-mail de reinitialisation" }
		}

		return { success: true, message: "Mail envoyé" }
	} catch (error) {
		return { success: true, message: "Erreur durant l'envoi du mot de passe de réinitialisation" }
	}
}

export const sendResetSuccessEmail = async (email: string) => {
	try {
		const { error } = await resend.emails.send({
			from: "Phinestia <no-reply@phinestia.fr>",
			to: [email],
			subject: "Password reinitialisé avec succès",
			html: `Votre mot de passe a été modifié.`
		})

		if (error) {
			return { success: false, message: "Impossible d'envoyer l'e-mail" }
		}

		return { success: true, message: "Mail d'information de changement de mot de passe envoyé" }
	} catch (error) {
		return { success: false, message: "Erreur durant l'envoi du mail" }
	}
}