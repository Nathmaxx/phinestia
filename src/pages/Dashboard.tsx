import { useNavigate } from "react-router-dom"
import Button from "../components/buttons/Button"
import { useAuth } from "../hooks/useAuthContext"

const Dashboard = () => {

	const { deleteUser } = useAuth()
	const navigate = useNavigate()

	const handleClick = async () => {
		const response = await deleteUser()
		if (response.success) {
			navigate('/')
		}
	}

	return (
		<div className="h-screen w-full flex flex-col gap-5 items-center justify-center">

			<Button
				onClick={handleClick}
			>
				Supprimer
			</Button>

		</div>
	)
}

export default Dashboard