import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthContext"
import SubmitButton from "../buttons/SubmitButton"
import PasswordInput from "../Inputs/PasswordInput"
import TextInput from "../Inputs/TextInput"
import Message from "../Message"
import { LoginInfos } from "../../types/user"
import { LoginPages } from "../../types/pages"
import { useState } from "react"

type LoginFormProps = {
	className?: string
	userInfos: LoginInfos
	formRef: React.RefObject<HTMLFormElement | null>
	move: (value: LoginPages) => void
	setInfo: (type: keyof LoginInfos, value: string) => void
	handleToggle: () => void
}

const LoginForm = ({ className, userInfos, formRef, move, setInfo, handleToggle }: LoginFormProps) => {

	const { login } = useAuth()
	const navigate = useNavigate()

	const [message, setMessage] = useState("")

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setMessage("")
		if (!userInfos.email || !userInfos.password) {
			return
		}
		const response = await login(userInfos.email, userInfos.password)
		if (response.success) {
			navigate("/dashboard")
		} else if (response.message === "E-mail non vérifié") {
			move("verify-email")
		} else {
			setMessage(response.message)
		}
	}

	const handleForgotPassword = () => {
		move("forgot-password")
	}

	return (
		<form
			className={`w-full font-bricolage flex flex-col opacity-0 ${className}`}
			onSubmit={handleSubmit}
			autoComplete="off"
			ref={formRef}
		>
			<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">Se connecter</h2>

			<p className="text-gray-700">Adresse mail</p>
			<TextInput
				value={userInfos.email}
				setValue={(value: string) => setInfo("email", value)}
				placeholder="jeandupont@mail.com"
				type="email"
				className="mb-4"
			/>

			<p className="text-gray-700">Mot de passe</p>
			<PasswordInput
				value={userInfos.password}
				setValue={(value: string) => setInfo("password", value)}
				placeholder="************"
			/>
			<p className='mb-4 text-sm mt-1.5 cursor-pointer hover:underline' onClick={handleForgotPassword}>Mot de passe oublié ?</p>


			<SubmitButton className="flex items-center justify-center mt-2 font-figtree">
				<span>Connexion</span>
			</SubmitButton>

			<Message message={message} className="mt-3" />

			<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
				Pas encore de compte ? <span className="underline">S'inscrire</span>
			</p>
		</form >

	)
}

export default LoginForm