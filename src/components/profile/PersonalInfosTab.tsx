import { useState } from "react"
import TextInput from "../Inputs/TextInput"
import Button from "../buttons/Button"
import Message from "../Message"
import { useAuth } from "../../hooks/useAuthContext"
import { validateEmail, validateFirstName } from "../../utils/validation"

const PersonalInfoTab = () => {

	const { userInfos, updatePersonalInfos } = useAuth()
	const [firstName, setFirstName] = useState(userInfos.firstName)
	const [email, setEmail] = useState(userInfos.email)
	const [message, setMessage] = useState("")

	const handleSave = async () => {
		setMessage("")

		const verifyFirstName = validateFirstName(firstName)
		if (verifyFirstName !== "") {
			setMessage(verifyFirstName)
			setTimeout(() => setMessage(""), 3000)
			return
		}

		const verifyEmail = validateEmail(email)
		if (!verifyEmail) {
			setMessage("L'adresse e-mail est incorrecte")
			setTimeout(() => setMessage(""), 3000)
			return
		}

		const response = await updatePersonalInfos(firstName, email)
		if (!response.success) {
			setEmail(userInfos.email)
			setFirstName(userInfos.firstName)
			setMessage(response.message)
			setTimeout(() => setMessage(""), 3000)
			return
		}

		setMessage("Les modifications ont été enregistrées")
		setTimeout(() => setMessage(""), 3000)
	}

	return (
		<div className="w-[400px]">
			<h2 className="text-xl font-semibold text-gray-800 mb-4 font-figtree">
				Informations personnelles
			</h2>

			<div className="mb-4">
				<p className="text-gray-700 mb-1">Prénom</p>
				<TextInput
					value={firstName}
					setValue={setFirstName}
					placeholder="Votre prénom"
				/>
			</div>

			<div className="mb-6">
				<p className="text-gray-700 mb-1">Email</p>
				<TextInput
					value={email}
					setValue={setEmail}
					type="email"
					placeholder="votre@email.com"
				/>
				<p className="text-sm text-gray-500 mt-1">
					Cette adresse email est utilisée pour vous connecter
				</p>
			</div>

			<Button
				onClick={handleSave}
				className="bg-sky-violet hover:bg-sky-dark-violet transition duration-300 font-semibold text-white rounded-md"
			>
				Enregistrer
			</Button>

			<Message message={message} className="mt-4" />
		</div>
	)
}

export default PersonalInfoTab