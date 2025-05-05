import { ReactNode } from "react"
import api from "../utils/axios"
import { catchError } from "../utils/error"
import { useAuth } from "../hooks/useAuthContext"
import { AccountContext } from "../hooks/useAccountContext"


type AccountProviderProps = {
	children: ReactNode
}

export const AccountProvider = ({ children }: AccountProviderProps) => {

	const { userInfos } = useAuth()

	const addAccount = async (name: string, amount: number) => {
		try {
			await api.post(`/account/add/${userInfos.id}`, { name, amount })
			return { success: true, message: "Compte ajouté" }
		} catch (error) {
			return catchError(error, "Impossible d'ajouter le compte, veuillez réessayer plus tard")
		}
	}


	const value = {
		addAccount
	}

	return (
		<AccountContext.Provider value={value}>
			{children}
		</AccountContext.Provider>
	)
}