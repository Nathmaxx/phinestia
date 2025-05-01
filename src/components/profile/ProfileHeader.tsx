import { User } from "lucide-react"

type ProfileHeaderProps = {
	firstName: string
	email: string
	createdAt: string
}

const ProfileHeader = ({ firstName, email, createdAt }: ProfileHeaderProps) => {
	// Formater la date d'inscription
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

	return (
		<div className="bg-white p-6 rounded-2xl shadow-md flex items-center">
			<div className="h-24 w-24 rounded-full bg-sky-violet/10 flex items-center justify-center">
				<User size={48} className="text-sky-violet" />
			</div>
			<div className="ml-6">
				<h1 className="text-3xl font-bricolage font-semibold text-sky-dark-violet">
					{firstName || "Utilisateur"}
				</h1>
				<p className="text-gray-600 mt-1">{email}</p>
				<p className="text-gray-500 text-sm mt-2">
					Membre depuis le {formatDate(createdAt)}
				</p>
			</div>
		</div>
	)
}

export default ProfileHeader