import { createContext, useContext } from "react"
import { Operation } from "../types/context"
import { UserContextInfos } from "../types/user"

type AuthContextType = {
	isAuthenticated: boolean
	userInfos: UserContextInfos
	checkAuth: () => Promise<Operation>
	login: (email: string, password: string) => Promise<Operation>
	logout: () => Promise<Operation>
	signUp: (firstName: string, email: string, password: string) => Promise<Operation>
	verifyEmail: (code: string, email: string) => Promise<Operation>
	resendVerificationEmail: (email: string) => Promise<Operation>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (context === undefined) {
		throw new Error("UseAuth doit être utilisé à l'intérieur d'un AuthProvider")
	}

	return context
}