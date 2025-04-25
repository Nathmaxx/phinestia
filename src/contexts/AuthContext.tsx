import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "../hooks/useAuthContext"
import { UserContextInfos } from "../types/user"
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
		isVerified: false
	})

	const setUserInfo = (field: keyof UserContextInfos, value: string | boolean) => {
		setUserInfos({
			...userInfos,
			[field]: value
		})
	}

	const checkAuth = async () => {
		try {
			const response = await api.get("/auth/check-auth")
			console.log(response)
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
	}, [])

	// Fonction de connexion 

	//Fonction de création de compte 

	//...

	const value = {
		checkAuth,
		login
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}