import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "../hooks/useAuthContext"
import { UserContextInfos, UserInfosResponse } from "../types/user"
import { catchError } from "../utils/error"
import api from "../utils/axios"

type ExpenseProviderProps = {
	children: ReactNode
}

export const AuthProvider = ({ children }: ExpenseProviderProps) => {

	const initialInfos = {
		id: "",
		firstName: "",
		email: "",
		isVerified: false,
		createdAt: ""
	}
	const [userInfos, setUserInfos] = useState<UserContextInfos>(initialInfos)

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
			await api.post("/auth/login", { email, password })
			return { success: true, message: "Utilisateur connecté" }
		} catch (error) {
			return catchError(error, "Impossible de connecter l'utilisateur")
		}
	}

	const logout = async () => {
		try {
			await api.get("/auth/logout")
			setUserInfos(initialInfos)
			setIsAuthenticated(false)
			return { success: true, message: "Utilisateur déconnecté" }
		} catch (error) {
			return catchError(error, "Impossible de déconnecter l'utilisateur")
		}
	}

	const signUp = async (firstName: string, email: string, password: string) => {
		try {
			await api.post("/auth/signup", { firstName, email, password })
			return { success: true, message: "Utilisateur crée" }
		} catch (error) {
			return catchError(error, "Impossible de créer l'utilisateur")
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
		login,
		logout,
		signUp
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}