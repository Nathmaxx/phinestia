import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "../hooks/useAuthContext"
import { UserContextInfos, UserInfosResponse } from "../types/user"
import { catchError } from "../utils/error"
import api from "../utils/axios"

type ExpenseProviderProps = {
	children: ReactNode
}

export const AuthProvider = ({ children }: ExpenseProviderProps) => {

	const [userInfos, setUserInfos] = useState<UserContextInfos>({
		id: "",
		firstName: "",
		email: "",
		isVerified: false,
		createdAt: ""
	})

	const [isAuthenticated, setIsAuthenticated] = useState(false)

	// const setUserInfo = (field: keyof UserContextInfos, value: string | boolean) => {
	// 	setUserInfos({
	// 		...userInfos,
	// 		[field]: value
	// 	})
	// }

	const checkAuth = async () => {
		try {

			if (userInfos.id !== "") {
				setIsAuthenticated(true)
				return { success: true, message: "Utilisateur déjà connecté" };
			}

			const response = await api.get("/auth/check-auth")
			if (response && response.data.user) {
				const user = response.data.user as UserInfosResponse
				setUserInfos({
					email: user.email,
					id: user._id,
					firstName: user.firstName,
					isVerified: user.isVerified,
					createdAt: user.createdAt
				})
			}
			setIsAuthenticated(true)
			return { success: true, message: "Utilisateur connecté" }
		} catch (error) {
			return catchError(error, "Imporrible de vérifier l'authentification")
		}
	}

	const login = async (email: string, password: string) => {
		try {
			const response = await api.post("/auth/login", { email, password })
			console.log(response)
			return { success: true, message: "Utilisateur connecté" }
		} catch (error) {
			console.log(catchError(error, "Impossible de connecter l'utilisateur"))
			return catchError(error, "Impossible de connecter l'utilisateur")
		}
	}


	useEffect(() => {
		checkAuth()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const value = {
		isAuthenticated,
		userInfos,
		checkAuth,
		login
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}