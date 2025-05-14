import { createContext, useContext } from "react"
import { Operation } from "../types/context"
import { Account, AccountName } from "../types/accounts"
import { CategoryName, UpdatedCategory } from "../types/categories"


type AccountContextType = {
	accounts: Account[]
	accountNames: AccountName[]
	addAccount: (name: string, amount: number) => Promise<Operation>
	fetchAccounts: () => Promise<Operation>
	deleteAccount: (accountId: string) => Promise<Operation>
	updateAccountInfos: (accountId: string, name: string, amount: number) => Promise<Operation>
	categoryNames: (accountName: string) => null | CategoryName[]
	addCategory: (accountId: string, name: string) => Promise<Operation>
	findAccount: (accountName: string) => Account | null
	updateCategoryName: (accountId: string, categoryId: string, name: string) => Promise<Operation>
	deleteCategory: (accountId: string, categoryId: string) => Promise<Operation>
	updateCategoriesAmounts: (accountid: string, updatedCategories: UpdatedCategory[]) => Promise<Operation>
	categoryTransfert: (accountid: string, initialCategoryId: string, finalCategoryId: string, amount: number) => Promise<Operation>
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const useAccount = () => {
	const context = useContext(AccountContext)

	if (context === undefined) {
		throw new Error("UseAccount doit être utilisé à l'intérieur d'un AccountProvider")
	}

	return context
}