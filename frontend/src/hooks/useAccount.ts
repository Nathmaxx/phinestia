import { AccountContext } from "@/contexts/AccountContext"
import { useContext } from "react"

export const useAccount = () => {
	const context = useContext(AccountContext)

	if (context === undefined) {
		throw new Error("UseAccount doit être utilisé à l'intérieur d'un AccountProvider")
	}

	return context
}