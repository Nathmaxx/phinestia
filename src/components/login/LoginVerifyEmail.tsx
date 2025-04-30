import EmailVerification from "../EmailVerification"
import Message from "../Message"

type LoginVerifyEmailProps = {
	verifyRef: React.RefObject<HTMLDivElement | null>
	email: string
	message: string
	setMessage: (value: string) => void
}

const LoginVerifyEmail = ({ verifyRef, email, message, setMessage }: LoginVerifyEmailProps) => {
	return (
		<div
			ref={verifyRef}
			className="opacity-0 w-full"
		>
			<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">
				Vérification de l'email
			</h2>

			<p className="text-center">Votre email n'a pas encore été vérifié</p>
			<p className="text-center">Lors de votre inscription, un email de vérification a été envoyé à l'adresse :</p>
			<p className="text-center mb-3 font-semibold">{email}</p>
			<p className="text-center mb-2">Entrez le code de vérification</p>

			<EmailVerification
				email={email}
				setMessage={setMessage}
			/>

			<Message message={message} className="mt-3" />
		</div>
	)
}

export default LoginVerifyEmail