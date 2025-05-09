export const formatDate = (dateString: string) => {
	if (!dateString) return "Date inconnue"
	try {
		const date = new Date(dateString)
		return date.toLocaleDateString('fr-FR', {
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		})
	} catch {
		return "Date invalide"
	}
}