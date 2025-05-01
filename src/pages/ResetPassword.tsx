import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PasswordInput from "../components/Inputs/PasswordInput"
import PasswordValidator from "../components/PasswordValidator"
import Button from "../components/buttons/Button"
import Message from "../components/Message"
import { useAuth } from "../hooks/useAuthContext"

const ResetPassword = () => {
	const { id } = useParams()
	const { resetPassword } = useAuth()
	const navigate = useNavigate()

	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [isValidPassword, setIsValidPassword] = useState(false)
	const [message, setMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async () => {
		setMessage("")

		if (!isValidPassword) {
			setMessage("Le mot de passe ne respecte pas tous les critères")
			return
		}

		if (password !== confirmPassword) {
			setMessage("Les mots de passe ne correspondent pas")
			return
		}

		setIsLoading(true)

		if (id && id.length === 64) {
			const response = await resetPassword(id, password)
			if (response.success) {
				setIsLoading(false)
				setMessage("Mot de passe réinitialisé avec succès ! Redirection vers la page de connexion")

				setTimeout(() => {
					navigate("/authentification/connexion")
				}, 2500)

				return
			} else {
				setMessage(response.message)
				return
			}
		} else {
			setTimeout(() => {
				setMessage("Lien invalide ou expiré")
				setIsLoading(false)
				return
			}, 1000)
		}

	}

	return (
		<div className="w-full h-screen flex items-center justify-center bg-sky-semiviolet/10">
			<div className="bg-white w-[450px] rounded-2xl shadow-xl p-8">
				<h2 className="text-center text-4xl text-sky-violet mb-4 font-medium font-bricolage">
					Réinitialiser le mot de passe
				</h2>

				<div className="font-figtree">
					<p className="mb-5">Veuillez choisir un nouveau mot de passe pour votre compte.</p>

					<p className="text-gray-700">Nouveau mot de passe</p>
					<PasswordInput
						value={password}
						setValue={setPassword}
						placeholder="************"
					/>

					<PasswordValidator
						password={password}
						setIsValidPassword={setIsValidPassword}
						className="mb-5 mt-2"
					/>

					<p className="text-gray-700">Confirmer le mot de passe</p>
					<PasswordInput
						value={confirmPassword}
						setValue={setConfirmPassword}
						placeholder="************"
						className="mb-6"
					/>

					<Button
						onClick={handleSubmit}
						className="w-full bg-sky-violet hover:bg-sky-dark-violet transition font-semibold text-white rounded-md"
						isLoading={isLoading}
					>
						Réinitialiser
					</Button>

					<Message message={message} className="mt-4" />

					<div className="text-center mt-5">
						<p className="text-sm cursor-pointer hover:underline" onClick={() => navigate("/authentification/connexion")}>
							Retour à la page de connexion
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResetPassword