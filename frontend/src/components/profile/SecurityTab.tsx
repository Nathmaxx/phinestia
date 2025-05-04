import { useState } from "react"
import PasswordInput from "../Inputs/PasswordInput"
import PasswordValidator from "../PasswordValidator"
import Button from "../buttons/Button"
import Message from "../Message"
import { useAuth } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"

const SecurityTab = () => {

	const [currentPassword, setCurrentPassword] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [isValidPassword, setIsValidPassword] = useState(false)
	const [message, setMessage] = useState("")

	const { deleteUser } = useAuth()
	const navigate = useNavigate()

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

	const handleDeleteUser = async () => {
		const response = await deleteUser()
		if (response.success) {
			navigate('/')
		}
	}

	return (
		<div className="w-full flex gap-8">
			<div className="w-1/2">
				<h2 className="text-xl font-semibold text-gray-800 mb-2 font-figtree">
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
					className="bg-sky-violet hover:bg-sky-dark-violet transition duration-300 font-semibold text-white rounded-md px-2 py-1"
				>
					Mettre à jour le mot de passe
				</Button>
				<Message message={message} className="mt-4" />
			</div>
			<div className="w-1/2">
				<h2 className="text-xl font-semibold text-gray-800 mb-2 font-figtree">
					Supprimer le compte
				</h2>
				<Button
					onClick={handleDeleteUser}
					className="bg-red-700 rounded-md text-white font-figtree font-medium px-2 py-1"
				>
					Supprimer le compte
				</Button>
			</div>
		</div>
	)
}

export default SecurityTab