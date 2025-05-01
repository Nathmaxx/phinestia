
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
