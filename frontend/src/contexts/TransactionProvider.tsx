import { ReactNode } from "react"
import { TransactionContext, TransactionContextType } from "./TransactionContext"
import { Operation } from "@/types/context"

type TransactionProviderProps = {
	children: ReactNode
}

export const TransactionProvider = ({ children }: TransactionProviderProps) => {

	const addTransaction = async (): Promise<Operation> => {
		return { success: true, message: "Transaction ajoutée avec succès" }
	}

	const value: TransactionContextType = {
		addTransaction
	}

	return (
		<TransactionContext.Provider value={value}>
			{children}
		</TransactionContext.Provider>
	)
}