
export const validateEmail = (email: string) => {
	if (!email) {
		return false
	}

	if (email.length < 5 || email.length > 60) {
		return false;
	}

	const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

	if (!emailRegex.test(email)) {
		return false;
	}

	const parts = email.split('@');
	if (parts.length !== 2 || !parts[1].includes('.')) {
		return false;
	}

	const tld = parts[1].split('.').pop() || '';
	if (tld.length < 2) {
		return false;
	}

	return true
}


export const validateFirstName = (firstName: string) => {
	// Vérifier si le prénom est vide
	if (!firstName || firstName.trim() === "") {
		return "Le prénom est requis";
	}

	// Vérifier la longueur
	if (firstName.length < 2) {
		return "Le prénom doit contenir au moins 2 caractères";
	}

	if (firstName.length > 20) {
		return "Le prénom doit contenir au maximum 20 caractères";
	}

	// Regex pour les caractères autorisés : lettres, espaces, apostrophes et tirets
	// Permet les caractères accentués et les caractères d'autres alphabets
	const nameRegex = /^[\p{L}\s'-]+$/u;

	if (!nameRegex.test(firstName)) {
		return "Le prénom ne doit contenir que des lettres, des espaces, des tirets ou des apostrophes"

	}

	// Vérifier qu'il ne contient pas seulement des espaces, tirets ou apostrophes
	const containsLetters = /[\p{L}]/u.test(firstName);
	if (!containsLetters) {
		return "Le prénom doit contenir au moins une lettre"
	}

	return "";
};

export const updateAmount = (value: string, setValue: (value: string) => void) => {
	const sanitizedValue = value.replace(/[^\d.,]/g, '')
	let numericValue = sanitizedValue.replace(',', '.')

	if (numericValue.startsWith('.')) {
		numericValue = '0' + numericValue
	}

	const parts = numericValue.split('.');

	if (parts[0].length > 9 || (parts[1] && parts[1].length > 2) || parts.length === 3) {
		return
	}

	setValue(numericValue)
}

export const validateAmount = (value: string) => {
	const parts = value.split('.');
	if (parts[0].length > 9 || (parts[1] && parts[1].length > 2) || parts.length === 3) {
		return false
	}
	if (value.endsWith('.')) {
		return false
	}
	if (isNaN(parseFloat(value))) {
		return false;
	}
	if (!value) {
		return false;
	}

	return true
}

export const validateName = (value: string, setName: (value: string) => void, setNameError: (value: string) => void) => {
	setName(value);
	if (!value.trim()) {
		setNameError('Le nom de la catégorie est requis');
		return false;
	} else if (value.trim().length < 2) {
		setNameError('Le nom doit contenir au moins 2 caractères');
		return false;
	} else if (value.trim().length > 30) {
		setNameError('Le nom ne doit pas dépasser 30 caractères');
		return false;
	} else {
		setNameError('');
		return true;
	}
};