import { ReactNode, useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuthContext"
import { Navigate, useLocation } from "react-router-dom"

type ProtectedRoutesProps = {
	children: ReactNode
	redirectPath?: string
}

const ProtectedRoute = ({ children, redirectPath = "/authentification/connexion" }: ProtectedRoutesProps) => {

	const { checkAuth, userInfos } = useAuth()
	const [isChecking, setIsChecking] = useState(true)
	const location = useLocation()

	useEffect(() => {
		const verifyAuth = async () => {
			try {
				await checkAuth()
				setIsChecking(false)
			} catch (error) {
				console.error(error)
				setIsChecking(false)
			}
		}

		verifyAuth()
	}, [checkAuth])

	if (isChecking) {
		return (
			<div className="w-full h-screen"></div>
		);
	}

	if (!userInfos.id) {
		return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
	}

	return <>{children}</>;
}

export default ProtectedRoute