import { useState } from "react"
import TextInput from "../Inputs/TextInput"
import Message from "../Message"
import { LoginPages } from "../../types/pages"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "../../hooks/useAuth"
import Button from "../buttons/Button"
import { validateEmail } from "../../utils/validation"

type ForgotPasswordProps = {
	forgotRef: React.RefObject<HTMLDivElement | null>
	move: (page: LoginPages, direction?: "next" | "previous") => void
}

const LoginForgotPassword = ({ forgotRef, move }: ForgotPasswordProps) => {

	const [email, setEmail] = useState("")
	const [message, setMessage] = useState("")

	const { forgotPassword } = useAuth()

	const handleClick = async () => {

		setMessage("")

		if (!validateEmail(email)) {
			setMessage("L'e-mail n'est pas valide")
			return
		}

		await forgotPassword(email)
		setMessage("Veuillez consulter votre boite mail")

		setTimeout(() => {
			setEmail("")
			move("login", "previous")
		}, 2500)
	}

	return (
		<div
			ref={forgotRef}
			className="opacity-0 w-full relative"
		>
			<ArrowLeft className="cursor-pointer absolute -translate-full text-sky-dark-violet" onClick={() => move("login", "previous")} />
			<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">Mot de passe oublié</h2>
			<p className="font-figtree">Entrez votre adresse e-mail</p>
			<TextInput
				setValue={setEmail}
				value={email}
				placeholder="jeandupont@email.com"
				type="email"
				className="mb-4 mt-1"
			/>

			<p className="font-figtree mb-3 px-4 text-justify">Si cette adresse mail est reliée à un compte, vous recevrez un e-mail permettant de réinitialiser votre mot de passe</p>

			<Button
				onClick={handleClick}
				className="w-full bg-sky-violet hover:bg-sky-dark-violet transition duration-300 rounded-md font-figtree text-white font-medium"
			>
				Envoyer
			</Button>

			<Message message={message} className="mt-4" />
		</div>
	)
}

export default LoginForgotPassword