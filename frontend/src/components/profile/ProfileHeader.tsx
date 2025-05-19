import { User } from "lucide-react"
import LogoutButton from "../buttons/LogoutButton"
import { formatDateString } from "../../utils/format"


type ProfileHeaderProps = {
	firstName: string
	email: string
	createdAt: string
}

const ProfileHeader = ({ firstName, email, createdAt }: ProfileHeaderProps) => {


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
					Membre depuis le {formatDateString(createdAt)}
				</p>
			</div>
			<LogoutButton />
		</div>
	)
}

export default ProfileHeader