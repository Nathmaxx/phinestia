import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthContext"
import Button from "./Button"

type LogoutButtonProps = {
	className?: string
}

const LogoutButton = ({ className = "" }: LogoutButtonProps) => {

	const { logout } = useAuth()

	const navigate = useNavigate()

	const handleClick = async () => {
		const response = await logout()
		if (response.success) {
			navigate("/")
		}
	}

	return (
		<Button
			onClick={handleClick}
			className={`px-2 py-1.5 bg-sky-semiviolet font-medium text-white font-figtree rounded-md shadow-sm hover:shadow-md duration-300 transition-all ${className}`}
		>
			Déconnexion
		</Button >
	)
}

export default LogoutButton