import { useState } from "react"
import { SignInInfos } from "../../types/user"
import TextInput from "../Inputs/TextInput"
import SubmitButton from "../SubmitButton"
import { MoveRight } from "lucide-react"

type SignInFormProps = {
	className?: string
	gap?: number
}

const SignInForm = ({ className, gap = 4 }: SignInFormProps) => {

	const [userInfos, setUserInfos] = useState({
		firstName: "",
		email: "",
		password: ""
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
			<h2 className="text-center text-4xl text-sky-violet my-4 font-medium font-gabarito">Créer un compte</h2>

			<p className="text-gray-700">Prénom</p>
			<TextInput
				value={userInfos.firstName}
				setValue={(value: string) => setInfo("firstName", value)}
				placeholder="Jean"
				className={`mb-${gap}`}
			/>

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
				className={`mb-${gap}`}
				placeholder="motdepasse123"
			/>
			<SubmitButton className="relative flex items-center justify-center group mt-4">
				<span>Valider</span>
				<MoveRight
					strokeWidth={1.5}
					className="absolute right-6 group-hover:translate-x-2 transition duration-300"
				/>
			</SubmitButton>
		</form>
	)
}

export default SignInForm