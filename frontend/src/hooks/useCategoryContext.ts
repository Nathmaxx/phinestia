import { createContext, useContext } from "react"
import { Operation } from "../types/context"


type CategoryContextType = {
	addAccount: (name: string, amount: string) => Promise<Operation>
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export const useCategory = () => {
	const context = useContext(CategoryContext)

	if (context === undefined) {
		throw new Error("UseAuth doit être utilisé à l'intérieur d'un CategoryProvider")
	}

	return context
}