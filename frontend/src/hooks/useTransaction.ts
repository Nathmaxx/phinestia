import { useContext } from "react"
import { TransactionContext } from "@/contexts/TransactionContext"

export const useTransaction = () => {
	const context = useContext(TransactionContext)

	if (context === undefined) {
		throw new Error("useTransaction doit être utilisé à l'intérieur d'un TransactionProvider")
	}

	return context
}