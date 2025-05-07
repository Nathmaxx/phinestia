import { createContext, useContext } from "react"
import { Operation } from "../types/context"
import { Account } from "../types/accounts"


type AccountContextType = {
	accounts: Account[]
	addAccount: (name: string, amount: number) => Promise<Operation>
	fetchAccounts: () => Promise<Operation>
	deleteAccount: (accountId: string) => Promise<Operation>
	updateAccount: (accountId: string, name: string, amount: number) => Promise<Operation>
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const useAccount = () => {
	const context = useContext(AccountContext)

	if (context === undefined) {
		throw new Error("UseAccount doit être utilisé à l'intérieur d'un AccountProvider")
	}

	return context
}