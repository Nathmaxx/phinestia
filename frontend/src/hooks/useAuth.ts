import { AuthContext } from "@/contexts/AuthContext"
import { useContext } from "react"

export const useAuth = () => {
	const context = useContext(AuthContext)

	if (context === undefined) {
		throw new Error("UseAuth doit être utilisé à l'intérieur d'un AuthProvider")
	}

	return context
}