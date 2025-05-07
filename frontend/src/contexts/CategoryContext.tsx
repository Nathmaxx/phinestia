import { ReactNode, useState } from "react"
import { useAuth } from "../hooks/useAuthContext"
import api from "../utils/axios"
import { catchError } from "../utils/error"
import { Category, DBCategory } from "../types/categories"
import { CategoryContext } from "../hooks/useCategoryContext"


type CategoryProviderProps = {
	children: ReactNode
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {

	const { userInfos } = useAuth()

	const [categories, setCategories] = useState<Category[]>([])

	const addCategory = async (name: string, amount: number) => {
		try {
			const response = await api.post("/category/add", { name, amount, userId: userInfos.id })
			const newCategory = response.data.category as DBCategory
			setCategories([
				...categories,
				{
					id: newCategory._id,
					allocation: null,
					amount: newCategory.amount,
					budget: null
				}
			])
			return { success: true, message: "Catégorie ajoutée avec succès" }
		} catch (error) {
			return catchError(error, "Impossible d'ajouter la catégorie")
		}
	}

	const fetchCategories = async () => {
		try {
			const response = await api.get(`/category/${userInfos.id}`)
			const categories = response.data.categories as DBCategory[]
			const formattedCategories = categories.map(category => ({
				id: category._id,
				amount: category.amount,
				budget: category.budget,
				allocation: category.allocation
			}))
			setCategories(formattedCategories)
			return { success: true, message: "Catégories récupérés" }
		} catch (error) {
			return catchError(error, "Impossible de récupérer les catégories")
		}
	}

	const deleteCategory = async (categoryId: string) => {
		try {
			await api.delete(`/category/${categoryId}`)
			const newCategories = categories.filter(category => category.id !== categoryId)
			setCategories(newCategories)
			return { success: true, message: "Catégorie supprimée avec succès" }
		} catch (error) {
			return catchError(error, "Impossible de supprimer la catégorie")
		}
	}



	const value = {
		addCategory,
		fetchCategories,
		deleteCategory
	}

	return (
		<CategoryContext.Provider value={value}>
			{children}
		</CategoryContext.Provider>
	)
}