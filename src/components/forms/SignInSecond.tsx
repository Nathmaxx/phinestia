import { useState } from "react"
import { SignInInfos } from "../../types/user"
import PasswordInput from "../Inputs/PasswordInput"
import PasswordValidator from "../PasswordValidator"
import Message from "../Message"
import Button from "../buttons/Button"
import { ArrowLeft } from "lucide-react"

type SignInSecondProps = {
	userInfos: SignInInfos
	setInfo: (type: keyof SignInInfos, value: string) => void
	ref?: React.RefObject<HTMLDivElement | null>
	handleMove: (direction: "next" | "previous") => void
	className?: string
	handleToggle: () => void
	requestForSubmit: () => void
}

const SignInSecond = ({ userInfos, setInfo, ref, handleMove, className, handleToggle, requestForSubmit }: SignInSecondProps) => {

	const [message, setMessage] = useState("")
	const [isValidPassword, setIsValidPassword] = useState(false)

	const verifyInputs = () => {

		if (!isValidPassword) {
			return "Tous les critères ne sont pas validés"
		}

		if (userInfos.confirmPassword !== userInfos.password) {
			return "Les mots de passes ne correspondent pas"
		}

		return ""
	}

	const handleClick = () => {
		const errorMessage = verifyInputs()
		if (errorMessage !== "") {
			setMessage(errorMessage)
			console.log("Vérifications non validées")
			return
		}

		console.log("vérifications effectées, envoi")
		requestForSubmit()
	}

	return (
		<div ref={ref} className={`${className}`}>
			<ArrowLeft className="cursor-pointer" onClick={() => handleMove("previous")} />
			<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">Bienvenue {userInfos.firstName}</h2>

			<p className="text-gray-700">Mot de passe</p>
			<PasswordInput
				value={userInfos.password}
				setValue={(value: string) => setInfo("password", value)}
				placeholder="************"
			/>

			<PasswordValidator password={userInfos.password} setIsValidPassword={setIsValidPassword} className="mb-3 mt-2" />

			<p className="text-gray-700">Confirmer le mot de passe</p>
			<PasswordInput
				value={userInfos.confirmPassword}
				setValue={(value: string) => setInfo("confirmPassword", value)}
				placeholder="************"
				className='mb-4'
			/>

			<Button
				className="w-full bg-sky-violet hover:bg-sky-dark-violet transition font-semibold text-white rounded-md"
				onClick={handleClick}
			>
				Valider
			</Button>

			<Message message={message} className="mt-3" />

			<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
				Vous avez déjà un compte ? <span className="underline">Se connecter</span>
			</p>
		</div>
	)
}

export default SignInSecond