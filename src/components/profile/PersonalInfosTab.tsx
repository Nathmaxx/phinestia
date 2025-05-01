import { useState } from "react"
import TextInput from "../Inputs/TextInput"
import Button from "../buttons/Button"
import Message from "../Message"

const PersonalInfoTab = () => {
	const [firstName, setFirstName] = useState("Nathan")
	const [email, setEmail] = useState("nathan@exemple.com")
	const [message, setMessage] = useState("")

	const handleSave = () => {
		setMessage("Les modifications ont été enregistrées")
		setTimeout(() => setMessage(""), 3000)
	}

	return (
		<div className="max-w-lg">
			<h2 className="text-xl font-semibold text-gray-800 mb-4 font-bricolage">
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
					Cette adresse email est utilisée pour vous connecter et recevoir des notifications.
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