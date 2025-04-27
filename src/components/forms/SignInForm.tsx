import { useState } from "react"
import { SignInInfos } from "../../types/user"
import SubmitButton from "../buttons/SubmitButton"
import PasswordInput from "../Inputs/PasswordInput"
import PasswordValidator from "../PasswordValidator"
import SignInFirst from "./SignInFirst"

type SignInFormProps = {
	className?: string
	gap?: string
}

const SignInForm = ({ className }: SignInFormProps) => {

	const [userInfos, setUserInfos] = useState({
		firstName: "",
		email: "",
		password: "",
		confirmPassword: ""
	})

	const [step, setStep] = useState(1)

	const [isValidPassword, setIsValidPassword] = useState(false)

	const setInfo = (type: keyof SignInInfos, value: string) => {
		setUserInfos({
			...userInfos,
			[type]: value
		})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	const verifyInputs = () => {
		if (userInfos.firstName.length < 2) {
			return "Veuillez entrer un prénom plus long"
		}

		if (userInfos.password !== userInfos.confirmPassword) {
			return "Les mots de passes ne correspondent pas"
		}

		if (!isValidPassword) {
			return "Le mot de passe ne correspond pas aux critères"
		}

		return ""
	}

	return (
		<form
			className={`font-bricolage flex flex-col ${className}`}
			onSubmit={handleSubmit}
		>
			{step === 1 && (
				<SignInFirst
					setInfo={setInfo}
					setStep={setStep}
					userInfos={userInfos}
				/>
			)}

			{step === 2 && (
				<>
					<p className="text-gray-700">Mot de passe</p>
					<PasswordInput
						value={userInfos.password}
						setValue={(value: string) => setInfo("password", value)}
						placeholder="************"
						className='mb-4'
					/>

					<PasswordValidator password={userInfos.password} setIsValidPassword={setIsValidPassword} />

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
				</>
			)}

		</form>
	)
}

export default SignInForm