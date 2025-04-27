import { useState } from "react"
import { SignInInfos } from "../../types/user"
import Button from "../buttons/Button"
import TextInput from "../Inputs/TextInput"
import Message from "../Message"

type SignInFirstProps = {
	userInfos: SignInInfos
	setInfo: (type: keyof SignInInfos, value: string) => void
	setStep: (value: number) => void
	ref?: React.RefObject<HTMLDivElement | null>
	handleMove: (fromStep: number, direction: "next" | "previous") => void
	className?: string
}

const SignInFirst = ({ userInfos, setInfo, ref, handleMove, className }: SignInFirstProps) => {

	const [message, setMessage] = useState("")

	const verifyInputs = () => {
		if (userInfos.firstName.length < 2) {
			return "veuillez entrer un prénom plus long"
		}

		if (userInfos.firstName.length > 20) {
			return "Veuillez entrer un prénom plus court"
		}

		if (userInfos.email.length < 4) {
			return "Veuillez entrer un email valide"
		}

		return ""
	}

	const handleClick = () => {

		const inputsErrors = verifyInputs()

		if (inputsErrors !== "") {
			setMessage(inputsErrors)
			return
		}

		handleMove(1, "next")
	}

	return (
		<div ref={ref} className={`${className}`}>
			<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">Créer un compte</h2>

			<p className="text-gray-700">Prénom</p>
			<TextInput
				value={userInfos.firstName}
				setValue={(value: string) => setInfo("firstName", value)}
				placeholder="Jean"
				className='mb-4'
			/>

			<p className="text-gray-700">Adresse mail</p>
			<TextInput
				value={userInfos.email}
				type="email"
				setValue={(value: string) => setInfo("email", value)}
				placeholder="jeandupont@mail.com"
				className='mb-4'
			/>

			<Button
				onClick={handleClick}
				className="w-full bg-sky-violet rounded-md text-white font-semibold hover:bg-sky-dark-violet transition"
			>
				Continuer
			</Button>

			<Message message={message} className="mt-3" />
		</div >
	)
}

export default SignInFirst