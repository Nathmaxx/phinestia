import { useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

import Message from "../Message"
import TextInput from "../Inputs/TextInput"
import PasswordInput from "../Inputs/PasswordInput"
import SubmitButton from "../buttons/SubmitButton"
import { useAuth } from "../../hooks/useAuthContext"
import EmailVerification from "../EmailVerification"
import { LoginInfos } from "../../types/user"

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

	const formRef = useRef<HTMLFormElement>(null)
	const verifyRef = useRef<HTMLDivElement>(null)

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
			move()
		} else {
			setMessage(response.message)
		}
	}

	const move = () => {
		const move = -20

		gsap.to(formRef.current, {
			opacity: 0,
			x: move,
			duration: 0.3,
			ease: "power2.in",
			onComplete: () => {

				setVerifyEmail(true)
				setTimeout(() => {
					if (verifyRef && verifyRef.current) {
						gsap.set(verifyRef.current, { opacity: 0, x: -move });

						gsap.to(verifyRef.current, {
							opacity: 1,
							x: 0,
							duration: 0.3,
							ease: "power2.out"
						});
					}
				}, 50);
			}
		});
	};

	useEffect(() => {
		if (formRef && formRef.current) {
			gsap.set(formRef.current, { opacity: 1, x: 0 });
		}
	}, []);

	return !verifyEmail ? (
		<form
			className={`w-[300px] font-bricolage flex flex-col ${className || ""} opacity-0`}
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
			<p className='mb-4 text-sm mt-1.5 cursor-pointer hover:underline'>Mot de passe oublié ?</p>


			<SubmitButton className="flex items-center justify-center mt-2 font-figtree">
				<span>Connexion</span>
			</SubmitButton>

			<Message message={message} className="mt-3" />

			<p className="mt-2 text-sm font-bricolage cursor-pointer" onClick={handleToggle}>
				Pas encore de compte ? <span className="underline">S'inscrire</span>
			</p>
		</form >
	) : (
		<div
			ref={verifyRef}
			className="opacity-0 w-full"
		>
			<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">
				Vérification de l'email
			</h2>

			<p className="text-center">Votre email n'a pas encore été vérifié</p>
			<p className="text-center">Lors de votre inscription, un email de vérification a été envoyé à l'adresse :</p>
			<p className="text-center mb-3 font-semibold">{userInfos.email}</p>
			<p className="text-center mb-2">Entrez le code de vérification</p>

			<EmailVerification
				email={userInfos.email}
				setMessage={setMessage}
			/>

			<Message message={message} className="mt-3" />
		</div>
	)
}


export default LoginForm