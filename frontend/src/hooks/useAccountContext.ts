import { createContext, useContext } from "react"
import { Operation } from "../types/context"


type AccountContextType = {
	addAccount: (name: string, amount: number) => Promise<Operation>
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined)

export const useAccount = () => {
	const context = useContext(AccountContext)

	if (context === undefined) {
		throw new Error("UseAccount doit être utilisé à l'intérieur d'un AccountProvider")
	}

	return context
}