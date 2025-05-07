import { createContext, useContext } from "react"
import { Operation } from "../types/context"


type CategoryContextType = {
	addCategory: (name: string, amount: number) => Promise<Operation>
	fetchCategories: () => Promise<Operation>
	deleteCategory: (categoryId: string) => Promise<Operation>
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export const useCategory = () => {
	const context = useContext(CategoryContext)

	if (context === undefined) {
		throw new Error("UseAuth doit être utilisé à l'intérieur d'un CategoryProvider")
	}

	return context
}