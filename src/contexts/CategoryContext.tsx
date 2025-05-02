import { ReactNode } from "react"
import { CategoryContext } from "../hooks/useCategoryContext"
import api from "../utils/axios"
import { catchError } from "../utils/error"


type CategoryProviderProps = {
	children: ReactNode
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {

	const addAccount = async (name: string, amount: string, userId: string, budget: number, allocation: number) => {
		try {
			await api.post("/category/add", { name, amount, userId, budget, allocation })
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