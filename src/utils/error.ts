import { AxiosError } from "axios"

export const catchError = (error: unknown, elseMessage: string) => {
	let message = ""
	console.log(error)
	if (error instanceof AxiosError && error.response?.data.message) {
		message = error.response.data.message
	} else if (error instanceof AxiosError && error.message === "Network Error") {
		message = "Erreur de connexion à la base de données"
	} else {
		message = elseMessage
	}
	return { message, success: false }
}