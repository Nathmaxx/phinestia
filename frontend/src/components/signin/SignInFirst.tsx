import { SignInInfos } from "../../types/user"
import { validateEmail, validateFirstName } from "../../utils/validation"
import Button from "../buttons/Button"
import TextInput from "../Inputs/TextInput"
import Message from "../Message"

type SignInFirstProps = {
	userInfos: SignInInfos
	setInfo: (type: keyof SignInInfos, value: string) => void
	setStep: (value: number) => void
	ref?: React.RefObject<HTMLDivElement | null>
	handleMove: (direction: "next" | "previous") => void
	className?: string
	handleToggle: () => void
	message: string
	setMessage: (value: string) => void
}

const SignInFirst = ({ userInfos, setInfo, ref, handleMove, className, handleToggle, message, setMessage }: SignInFirstProps) => {


	const verifyInputs = () => {

		const verifyFirstName = validateFirstName(userInfos.firstName)
		if (verifyFirstName !== "") {
			return verifyFirstName
		}

		if (!validateEmail(userInfos.email)) {
			return "L'e-mail n'est pas valide"
		}

		return ""
	}

	const handleClick = () => {
		setMessage("")
		const inputsErrors = verifyInputs()

		if (inputsErrors !== "") {
			setMessage(inputsErrors)
			return
		}

		handleMove("next")
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
				className="w-full bg-sky-violet rounded-md text-white font-semibold hover:bg-sky-dark-violet transition py-1"
			>
				Continuer
			</Button>

			<Message message={message} className="mt-3" />

			<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
				Vous avez déjà un compte ? <span className="underline">Se connecter</span>
			</p>
		</div >
	)
}

export default SignInFirst