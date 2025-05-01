import { User } from "lucide-react"
import { useAuth } from "../../hooks/useAuthContext"
import { useNavigate } from "react-router-dom"
import Button from "../buttons/Button"

type ProfileHeaderProps = {
	firstName: string
	email: string
	createdAt: string
}

const ProfileHeader = ({ firstName, email, createdAt }: ProfileHeaderProps) => {
	const formatDate = (dateString: string) => {
		if (!dateString) return "Date inconnue"
		try {
			const date = new Date(dateString)
			return date.toLocaleDateString('fr-FR', {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
			})
		} catch {
			return "Date invalide"
		}
	}

	const { logout } = useAuth()

	const navigate = useNavigate()

	const handleClick = async () => {
		const response = await logout()
		if (response.success) {
			navigate("/")
		}
	}

	return (
		<div className="bg-white px-10 py-6 rounded-2xl shadow-md flex items-center">
			<div className="h-24 w-24 rounded-full bg-sky-violet/10 flex items-center justify-center">
				<User size={48} className="text-sky-violet" />
			</div>
			<div className="ml-6 flex flex-1 flex-col">
				<h1 className="text-3xl font-bricolage font-semibold text-sky-dark-violet">
					{firstName || "Utilisateur"}
				</h1>
				<p className="text-gray-600 mt-1">{email}</p>
				<p className="text-gray-500 text-sm mt-2">
					Membre depuis le {formatDate(createdAt)}
				</p>
			</div>
			<Button
				onClick={handleClick}
				className="px-2 py-1.5 bg-sky-semiviolet font-medium text-white font-figtree rounded-md shadow-sm hover:shadow-md duration-300 transition-all"
			>
				Déconnexion
			</Button>
		</div>
	)
}

export default ProfileHeader