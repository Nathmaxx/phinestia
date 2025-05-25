import { Operation } from "@/types/context"
import { createContext } from "react"

export type TransactionContextType = {
	addTransaction: () => Promise<Operation>
}

export const TransactionContext = createContext<TransactionContextType | undefined>(undefined)