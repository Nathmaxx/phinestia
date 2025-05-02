
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