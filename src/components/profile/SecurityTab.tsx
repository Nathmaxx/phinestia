import { useState } from "react"
import PasswordInput from "../Inputs/PasswordInput"
import PasswordValidator from "../PasswordValidator"
import Button from "../buttons/Button"
import Message from "../Message"

const SecurityTab = () => {
	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [isValidPassword, setIsValidPassword] = useState(false)
	const [message, setMessage] = useState("")

	const handleChangePassword = () => {
		if (!currentPassword) {
			setMessage("Veuillez saisir votre mot de passe actuel")
			return
		}

		if (!isValidPassword) {
			setMessage("Le nouveau mot de passe ne respecte pas les critères de sécurité")
			return
		}

		if (newPassword !== confirmPassword) {
			setMessage("Les mots de passe ne correspondent pas")
			return
		}

		setMessage("Mot de passe modifié avec succès")
		setCurrentPassword("")
		setNewPassword("")
		setConfirmPassword("")
		setTimeout(() => setMessage(""), 3000)
	}

	return (
		<div className="w-[400px]">
			<h2 className="text-xl font-semibold text-gray-800 mb-4 font-figtree">
				Changer votre mot de passe
			</h2>

			<div className="mb-4">
				<p className="text-gray-700 mb-1">Mot de passe actuel</p>
				<PasswordInput
					value={currentPassword}
					setValue={setCurrentPassword}
					placeholder="************"
				/>
			</div>

			<div className="mb-3">
				<p className="text-gray-700 mb-1">Nouveau mot de passe</p>
				<PasswordInput
					value={newPassword}
					setValue={setNewPassword}
					placeholder="************"
				/>
			</div>

			<PasswordValidator
				password={newPassword}
				setIsValidPassword={setIsValidPassword}
				className="mb-4"
			/>

			<div className="mb-6">
				<p className="text-gray-700 mb-1">Confirmer le nouveau mot de passe</p>
				<PasswordInput
					value={confirmPassword}
					setValue={setConfirmPassword}
					placeholder="************"
				/>
			</div>

			<Button
				onClick={handleChangePassword}
				className="bg-sky-violet hover:bg-sky-dark-violet transition duration-300 font-semibold text-white rounded-md"
			>
				Mettre à jour le mot de passe
			</Button>

			<Message message={message} className="mt-4" />
		</div>
	)
}

export default SecurityTab