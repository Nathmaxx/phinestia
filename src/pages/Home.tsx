import { useState } from "react"
import TextInput from "../components/Inputs/TextInput"
import SubmitButton from "../components/SubmitButton"
import { SignInInfos } from "../types/user"
import { MoveRight } from "lucide-react"

const Home = () => {

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
		<div className="w-full h-screen flex items-center justify-center">
			<form
				className="w-[300px] font-bricolage flex flex-col"
				onSubmit={handleSubmit}
			>
				<h2 className="text-center font-semibold text-2xl text-violet-800 my-3 select-none">Créer un compte</h2>

				<p className="text-gray-700">Prénom</p>
				<TextInput
					value={userInfos.firstName}
					setValue={(value: string) => setInfo("firstName", value)}
					placeholder="Jean"
					className="mb-4"
				/>

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
				<SubmitButton className="relative flex items-center justify-center group">
					<span>Valider</span>
					<MoveRight
						strokeWidth={1.5}
						className="absolute right-6 group-hover:translate-x-2 transition duration-300"
					/>
				</SubmitButton>
			</form>
		</div>
	)
}

export default Home