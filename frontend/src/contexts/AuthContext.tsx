import { ReactNode, useEffect, useState } from "react"
import { AuthContext } from "../hooks/useAuthContext"
import { UserContextInfos, UserInfosResponse } from "../types/user"
import { catchError } from "../utils/error"
import api from "../utils/axios"

type AuthProviderProps = {
	children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {

	const initialInfos = {
		id: "",
		firstName: "",
		email: "",
		isVerified: false,
		createdAt: ""
	}
	const [userInfos, setUserInfos] = useState<UserContextInfos>(initialInfos)

	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const [isChecking, setIsChecking] = useState(true)

	const checkAuth = async () => {
		setIsChecking(true)
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
			setIsAuthenticated(false)
			return catchError(error, "Imporrible de vérifier l'authentification")
		} finally {
			setIsChecking(false)
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

	const verifyEmail = async (code: string, email: string) => {
		try {
			await api.post('/auth/verify-email', { email, code })
			return { success: true, message: "Utilisateur vérifié" }
		} catch (error) {
			return catchError(error, "Impossible de vérifier l'utilisateur. Veuillez réessayer plus tard")
		}
	}

	const resendVerificationEmail = async (email: string) => {
		try {
			await api.post("/auth/resend-verification-email", { email })
			return { success: true, message: "Nouvel e-mail de vérification envoyé" }
		} catch (error) {
			return catchError(error, "Impossible de renvoyer l'email de vérification")
		}
	}

	const forgotPassword = async (email: string) => {
		try {
			await api.post("/auth/forgot-password", { email })
			return { success: true, message: "Email envoyé" }
		} catch (error) {
			return catchError(error, "Impossible d'envoyer l'email de reinitialisation")
		}
	}

	const resetPassword = async (param: string, newPassword: string) => {
		try {
			await api.post(`/auth/reset-password/${param}`, { password: newPassword })
			return { success: true, message: "Mot de passe modifié avec succès" }
		} catch (error) {
			return catchError(error, "Impossible de reinitialiser le mot de passe")
		}
	}

	const deleteUser = async () => {

		if (!userInfos.id) {
			return { success: false, message: "Impossible de supprimer l'itilisateur" }
		}

		try {
			await api.delete(`/auth/${userInfos.id}`)
			await logout()
			return { success: true, message: "utilisateur supprimmé avec succès" }
		} catch (error) {
			return catchError(error, "Impossible de supprimer l'utilisateur")
		}
	}

	const updateFirstName = async (firstName: string) => {

		if (!userInfos.id) {
			return { success: false, message: "Impossible de modifier le prénom" }
		}

		try {
			await api.put(`/auth/firstname/${userInfos.id}`, { firstName })
			setUserInfos({
				...userInfos,
				firstName
			})
			return { success: true, message: "Prénom modifié" }
		} catch (error) {
			return catchError(error, "Impossible de modifier le prénom")
		}
	}

	const updatePassword = async (ancientPassword: string, newPassword: string) => {

		if (!userInfos.id) {
			return { success: false, message: "Impossible de modifier le mot de passe" }
		}

		try {
			await api.put(`/auth/password/${userInfos.id}`, { ancientPassword, newPassword })
			return { success: true, message: "Mot de passe modifié" }
		} catch (error) {
			return catchError(error, "Impossible de modifier le mot de passe")
		}
	}

	const updateEmail = async (email: string) => {
		if (!userInfos.id) {
			return { success: false, message: "Impossible de modifier l'e-mail" }
		}

		try {
			await api.post(`/auth/update-email/${userInfos.id}`, { email })
			return { success: true, message: "Un code de vérification a été envoyé à votre nouvelle adresse e-mail" }
		} catch (error) {
			return catchError(error, "Impossible de modifier l'e-mail")
		}
	}

	const verifyNewEmail = async (code: string, email: string) => {
		if (!userInfos.id) {
			return { success: false, message: "Impossible de modifier l'e-mail" }
		}

		try {
			await api.post(`/auth/verify-new-email/${userInfos.id}`, { code })
			setUserInfos({
				...userInfos,
				email
			})
			return { success: true, message: "E-mail modifié avec succès" }
		} catch (error) {
			return catchError(error, "Impossible de modifier l'e-mail")
		}
	}

	useEffect(() => {
		checkAuth()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const value = {
		isAuthenticated,
		userInfos,
		isChecking,
		checkAuth,
		login,
		logout,
		signUp,
		verifyEmail,
		resendVerificationEmail,
		forgotPassword,
		resetPassword,
		deleteUser,
		updateFirstName,
		updatePassword,
		updateEmail,
		verifyNewEmail
	}

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	)
}