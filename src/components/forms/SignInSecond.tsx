import { useState } from "react"
import { SignInInfos } from "../../types/user"
import SubmitButton from "../buttons/SubmitButton"
import PasswordInput from "../Inputs/PasswordInput"
import PasswordValidator from "../PasswordValidator"
import Message from "../Message"

type SignInSecondProps = {
	userInfos: SignInInfos
	setInfo: (type: keyof SignInInfos, value: string) => void
	ref?: React.RefObject<HTMLDivElement | null>
	handleMove: (fromStep: number, direction: "next" | "previous") => void
	className?: string
	handleToggle: () => void
}

const SignInSecond = ({ userInfos, setInfo, ref, handleMove, className, handleToggle }: SignInSecondProps) => {

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

		const inputsErrors = verifyInputs()

		if (inputsErrors !== "") {
			setMessage(inputsErrors)
			return
		}
	}

	return (
		<div ref={ref} className={`${className}`}>
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

			<SubmitButton
				className="flex items-center justify-center group mt-2"
				onClick={handleClick}
			>
				<span>Valider</span>
			</SubmitButton>

			<Message message={message} className="mt-3" />

			<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
				Vous avez déjà un compte ? <span className="underline">Se connecter</span>
			</p>
		</div>
	)
}

export default SignInSecond