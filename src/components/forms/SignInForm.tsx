import { useState } from "react"
import { SignInInfos } from "../../types/user"
import TextInput from "../Inputs/TextInput"
import SubmitButton from "../SubmitButton"
import PasswordInput from "../Inputs/PasswordInput"

type SignInFormProps = {
	className?: string
	gap?: string
}

const SignInForm = ({ className, gap = "mb-4" }: SignInFormProps) => {

	const [userInfos, setUserInfos] = useState({
		firstName: "",
		email: "",
		password: "",
		confirmPassword: ""
	})

	const setInfo = (type: keyof SignInInfos, value: string) => {
		setUserInfos({
			...userInfos,
			[type]: value
		})
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
		<form
			className={`font-bricolage flex flex-col ${className}`}
			onSubmit={handleSubmit}
		>
			<h2 className="text-center text-4xl text-sky-violet my-4 font-medium font-bricolage">Créer un compte</h2>

			<p className="text-gray-700">Prénom</p>
			<TextInput
				value={userInfos.firstName}
				setValue={(value: string) => setInfo("firstName", value)}
				placeholder="Jean"
				className={gap}
			/>

			<p className="text-gray-700">Adresse mail</p>
			<TextInput
				value={userInfos.email}
				setValue={(value: string) => setInfo("email", value)}
				placeholder="jeandupont@mail.com"
				className={gap}
			/>

			<p className="text-gray-700">Mot de passe</p>
			<PasswordInput
				value={userInfos.password}
				setValue={(value: string) => setInfo("password", value)}
				placeholder="************"
				className={`${gap}`}
			/>

			<p className="text-gray-700">Confirmer le mot de passe</p>
			<PasswordInput
				value={userInfos.confirmPassword}
				setValue={(value: string) => setInfo("confirmPassword", value)}
				placeholder="************"
				className={`${gap}`}
			/>

			<SubmitButton className="flex items-center justify-center group mt-2">
				<span>Valider</span>
			</SubmitButton>
		</form>
	)
}

export default SignInForm