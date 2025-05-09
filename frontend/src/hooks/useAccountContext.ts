import { createContext, useContext } from "react"
import { Operation } from "../types/context"
import { Account, AccountName } from "../types/accounts"


type AccountContextType = {
	accounts: Account[]
	accountNames: AccountName[]
	addAccount: (name: string, amount: number) => Promise<Operation>
	fetchAccounts: () => Promise<Operation>
	deleteAccount: (accountId: string) => Promise<Operation>
	updateAccountInfos: (accountId: string, name: string, amount: number) => Promise<Operation>
	addCategory: (accountId: string, name: string) => Promise<Operation>
	findAccount: (accountName: string) => Account | null
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const useAccount = () => {
	const context = useContext(AccountContext)

	if (context === undefined) {
		throw new Error("UseAccount doit être utilisé à l'intérieur d'un AccountProvider")
	}

	return context
}