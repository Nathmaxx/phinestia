import { createContext, useContext } from "react"
import { Operation } from "../types/context"
import { UserContextInfos } from "../types/user"

type AuthContextType = {
	userInfos: UserContextInfos
	checkAuth: () => Promise<Operation>
	login: (email: string, password: string) => Promise<Operation>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (context === undefined) {
		throw new Error("UseAuth doit être utilisé à l'intérieur d'un AuthProvider")
	}

	return context
}