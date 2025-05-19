export const formatDateString = (dateString: string) => {
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

export const formatEuro = (value: number) => {
	return value.toLocaleString('fr-FR', {
		style: 'currency',
		currency: 'EUR',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})
}

export const formatPercentage = (value: number, total: number) => {
	return `${((value / total) * 100).toFixed(2)}%`;
};

// Formatage de la date
export const formatDate = (date: Date): string => {
	return date.toLocaleDateString("fr-FR", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
};