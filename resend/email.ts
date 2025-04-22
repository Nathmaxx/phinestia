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