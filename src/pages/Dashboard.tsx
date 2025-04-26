import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import { useAuth } from "../hooks/useAuthContext"


const Dashboard = () => {

	const { logout } = useAuth()

	const navigate = useNavigate()

	const handleClick = async () => {
		const response = await logout()
		if (response.success) {
			navigate("/")
		}
	}

	return (
		<div className="h-screen w-full flex flex-col gap-5 items-center justify-center">
			<p>Dashboard</p>
			<Button
				onClick={handleClick}
				className="px-2 py-1.5 bg-sky-semiviolet font-medium text-white font-figtree rounded-md shadow-sm"
			>
				Déconnexion
			</Button>
		</div>
	)
}

export default Dashboard