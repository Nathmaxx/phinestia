import { ReactNode } from "react"
import { catchError } from "../utils/error"
import { CategoryContext } from "../hooks/useCategoryContext"


type CategoryProviderProps = {
	children: ReactNode
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {

	const addCategory = async () => {
		try {

			return { success: true, message: "Catégorie ajoutée avec succès" }
		} catch (error) {
			return catchError(error, "Impossible d'ajouter la catégorie")
		}
	}

	const deleteCategory = async () => {
		try {
			return { success: true, message: "Catégorie supprimée avec succès" }
		} catch (error) {
			return catchError(error, "Impossible de supprimer la catégorie")
		}
	}

	const value = {
		addCategory,
		deleteCategory
	}

	return (
		<CategoryContext.Provider value={value}>
			{children}
		</CategoryContext.Provider>
	)
}