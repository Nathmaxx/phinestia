import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuthContext"
import { Navigate, useLocation } from "react-router-dom"
import Layout from "../Layout";
import LoadingSpinner from "../LoadingSpinner";

const ProtectedLayout = () => {
	const { checkAuth } = useAuth();
	const [status, setStatus] = useState<"checking" | "authenticated" | "unauthenticated">("checking");
	const location = useLocation();

	useEffect(() => {
		const verifyAuth = async () => {
			const startTime = Date.now()
			const response = await checkAuth()

			const elapsed = Date.now() - startTime
			if (elapsed < 500) {
				await new Promise(r => setTimeout(r, 500 - elapsed))
			}

			if (response.success) {
				setStatus('authenticated')
			} else {
				setStatus('unauthenticated')
			}
		}

		verifyAuth()
	}, [checkAuth]);

	if (status === "checking") {
		return <LoadingSpinner className="h-screen" size="lg" />;
	}

	if (status === "unauthenticated") {
		return <Navigate to="/authentification/connexion" state={{ from: location.pathname }} replace />;
	}

	return <Layout />;
};

export default ProtectedLayout