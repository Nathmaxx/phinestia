import { Operation } from "@/types/context"
import { createContext } from "react"

export type TransactionContextType = {
	transactions: number[]
	addExpense: (title: string, amount: number, description: string | null, date: Date, accountName: string, categoryName: string) => Promise<Operation>
	addIncome: () => Promise<Operation>
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined)