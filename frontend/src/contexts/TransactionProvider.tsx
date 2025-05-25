import { ReactNode, useState } from "react"
import { TransactionContext, TransactionContextType } from "./TransactionContext"
import { Operation } from "@/types/context"
import { useAccount } from "@/hooks/useAccount"
import api from "@/utils/axios"

type TransactionProviderProps = {
	children: ReactNode
}

export const TransactionProvider = ({ children }: TransactionProviderProps) => {

	const { accounts } = useAccount()

	const [transactions, setTransactions] = useState([])

	const addExpense = async (title: string, amount: number, description: string | null, date: Date, accountId: string, categoryId: string): Promise<Operation> => {
		const account = accounts.find(account => account.id === accountId)
		if (!account) {
			return { success: false, message: "Impossible de trouver le compte" }
		}
		const category = account.categories.find(cat => cat.id === categoryId)
		if (!category) {
			console.log("addExpense")
			return { success: false, message: "Impossible de trouver la catégorie" }
		}

		const validateAccountId = account.id
		const validateCategoryId = category.id
		const newExpense = {
			title,
			amount,
			date,
			description,
			type: "expense"
		}
		const response = await api.post(`/transaction/account/${validateAccountId}/category/${validateCategoryId}`, newExpense)
		console.log(response)

		return { success: true, message: "Dépense ajoutée avec succès" }
	}

	const addIncome = async () => {
		return { success: true, message: "Revenu ajouté avec succès" }
	}

	const value: TransactionContextType = {
		transactions,
		addExpense,
		addIncome
	}

	return (
		<TransactionContext.Provider value={value}>
			{children}
		</TransactionContext.Provider>
	)
}