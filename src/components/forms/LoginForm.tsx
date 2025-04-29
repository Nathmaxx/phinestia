import TextInput from "../Inputs/TextInput"
import SubmitButton from "../buttons/SubmitButton"
import { LoginInfos } from "../../types/user"
import { useState } from "react"
import { useAuth } from "../../hooks/useAuthContext"
import PasswordInput from "../Inputs/PasswordInput"
import { useNavigate } from "react-router-dom"
import Message from "../Message"

type LoginFormProps = {
	className?: string
	handleToggle: () => void
}

const LoginForm = ({ className, handleToggle }: LoginFormProps) => {

	const { login } = useAuth()
	const navigate = useNavigate()

	const [userInfos, setUserInfos] = useState({
		email: "",
		password: ""
	})

	const [verifyEmail, setVerifyEmail] = useState(false)
	const [message, setMessage] = useState("")

	const setInfo = (type: keyof LoginInfos, value: string) => {
		setUserInfos({
			...userInfos,
			[type]: value
		})
	}

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
			setVerifyEmail(true)
		} else {
			setMessage(response.message)
		}
	}

	return !verifyEmail ? (
		<form
			className={`w-[300px] font-bricolage flex flex-col ${className || ""}`}
			onSubmit={handleSubmit}
			autoComplete="off"
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
			<p className='mb-4 text-sm mt-1.5 cursor-pointer hover:underline'>Mot de passe oublié ?</p>


			<SubmitButton className="flex items-center justify-center mt-2 font-figtree">
				<span>Connexion</span>
			</SubmitButton>

			<Message message={message} className="mt-3" />

			<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
				Pas encore de compte ? <span className="underline">S'inscrire</span>
			</p>
		</form>
	) : (
		<div>

		</div>
	)
}


export default LoginForm