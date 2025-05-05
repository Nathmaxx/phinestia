import { ReactNode } from "react"
import { CategoryContext } from "../hooks/useCategoryContext"


type CategoryProviderProps = {
	children: ReactNode
}

export const CategoryProvider = ({ children }: CategoryProviderProps) => {


	const addCategory = async () => {

	}


	const value = {
		addCategory
	}

	return (
		<CategoryContext.Provider value={value}>
			{children}
		</CategoryContext.Provider>
	)
}