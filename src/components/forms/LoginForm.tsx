import TextInput from "../Inputs/TextInput"
import SubmitButton from "../SubmitButton"
import { LoginInfos } from "../../types/user"
import { useState } from "react"


const LoginForm = () => {

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
			className="w-[300px] font-bricolage flex flex-col"
			onSubmit={handleSubmit}
		>
			<h2 className="text-center font-semibold text-2xl text-violet-800 my-3 select-none">Se connecter</h2>

			<p className="text-gray-700">Adresse mail</p>
			<TextInput
				value={userInfos.email}
				setValue={(value: string) => setInfo("email", value)}
				placeholder="jeandupont@mail.com"
				className="mb-4"
			/>

			<p className="text-gray-700">Mot de passe</p>
			<TextInput
				value={userInfos.password}
				setValue={(value: string) => setInfo("password", value)}
				className="mb-6"
				placeholder="motdepasse123"
			/>
			<SubmitButton className="flex items-center justify-center">
				<span>Connexion</span>
			</SubmitButton>
		</form>
	)
}

export default LoginForm