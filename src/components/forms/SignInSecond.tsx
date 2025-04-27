import { useState } from "react"
import { SignInInfos } from "../../types/user"
import SubmitButton from "../buttons/SubmitButton"
import PasswordInput from "../Inputs/PasswordInput"
import PasswordValidator from "../PasswordValidator"

type SignInSecondProps = {
	userInfos: SignInInfos
	setInfo: (type: keyof SignInInfos, value: string) => void
	setIsValidPassword: (value: boolean) => void
	ref?: React.RefObject<HTMLDivElement | null>
	handleMove: (fromStep: number, direction: "next" | "previous") => void
	className?: string
}

const SignInSecond = ({ userInfos, setInfo, setIsValidPassword, ref, handleMove, className }: SignInSecondProps) => {

	const [message, setMessage] = useState("")

	const verifyInputs = () => {

		return ""
	}

	const handleClick = () => {

		const inputsErrors = verifyInputs()

		if (inputsErrors !== "") {
			setMessage(inputsErrors)
			return
		}

		//setStep(2)
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

			<SubmitButton className="flex items-center justify-center group mt-2">
				<span>Valider</span>
			</SubmitButton>
		</div>
	)
}

export default SignInSecond