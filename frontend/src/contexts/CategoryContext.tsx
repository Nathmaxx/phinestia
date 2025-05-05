import { ReactNode } from "react"
import { CategoryContext } from "../hooks/useCategoryContext"
import api from "../utils/axios"
import { catchError } from "../utils/error"
import { useAuth } from "../hooks/useAuthContext"


type CategoryProviderProps = {
	children: ReactNode
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {

	const { userInfos } = useAuth()

	const addAccount = async (name: string, amount: string) => {
		try {
			await api.post(`/category/add/${userInfos.id}`, { name, amount })
			return { success: true, message: "Catégorie ajoutée" }
		} catch (error) {
			return catchError(error, "Impossible d'ajouter la catégorie, veuillez réessayer plus tard")
		}
	}


	const value = {
		addAccount
	}

	return (
		<CategoryContext.Provider value={value}>
			{children}
		</CategoryContext.Provider>
	)
}