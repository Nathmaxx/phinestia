import TextInput from "../Inputs/TextInput"
import SubmitButton from "../buttons/SubmitButton"
import { LoginInfos } from "../../types/user"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuthContext"
import PasswordInput from "../Inputs/PasswordInput"
import { useNavigate } from "react-router-dom"

type LoginFormProps = {
	className?: string
	gap?: string
}

const LoginForm = ({ className, gap = "mb-4" }: LoginFormProps) => {

	const { login } = useAuth()
	const navigate = useNavigate()

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const response = await login(userInfos.email, userInfos.password)
		if (response.success) {
			navigate("/dashboard")
		}
	}

	return (
		<form
			className={`w-[300px] font-bricolage flex flex-col ${className}`}
			onSubmit={handleSubmit}
		>
			<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">Se connecter</h2>

			<p className="text-gray-700">Adresse mail</p>
			<TextInput
				value={userInfos.email}
				setValue={(value: string) => setInfo("email", value)}
				placeholder="jeandupont@mail.com"
				type="email"
				className={gap}
			/>

			<p className="text-gray-700">Mot de passe</p>
			<PasswordInput
				value={userInfos.password}
				setValue={(value: string) => setInfo("password", value)}
				placeholder="************"
			/>
			<p className={`${gap} text-sm mt-1.5 cursor-pointer hover:underline`}>Mot de passe oublié ?</p>


			<SubmitButton className="flex items-center justify-center mt-2">
				<span>Connexion</span>
			</SubmitButton>
		</form>
	)
}

export default LoginForm