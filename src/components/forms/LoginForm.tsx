import TextInput from "../Inputs/TextInput"
import SubmitButton from "../SubmitButton"
import { LoginInfos } from "../../types/user"
import { useState } from "react"

type LoginFormProps = {
	className?: string
	gap?: number
}

const LoginForm = ({ className, gap = 4 }: LoginFormProps) => {

	const [userInfos, setUserInfos] = useState({
		email: "",
		password: ""
	})

	const setInfo = (type: keyof LoginInfos, value: string) => {
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
			className={`w-[300px] font-bricolage flex flex-col ${className}`}
			onSubmit={handleSubmit}
		>
			<h2 className="text-center text-4xl text-sky-violet my-4 font-medium font-gabarito">Se connecter</h2>

			<p className="text-gray-700">Adresse mail</p>
			<TextInput
				value={userInfos.email}
				setValue={(value: string) => setInfo("email", value)}
				placeholder="jeandupont@mail.com"
				className={`mb-${gap}`}
			/>

			<p className="text-gray-700">Mot de passe</p>
			<TextInput
				value={userInfos.password}
				setValue={(value: string) => setInfo("password", value)}
				placeholder="motdepasse123"
			/>
			<p className={`mb-${gap} text-sm mt-1.5 cursor-pointer hover:underline`}>Mot de passe oublié ?</p>


			<SubmitButton className="flex items-center justify-center mt-4">
				<span>Connexion</span>
			</SubmitButton>
		</form>
	)
}

export default LoginForm