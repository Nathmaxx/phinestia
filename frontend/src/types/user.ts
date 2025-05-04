
export type LoginInfos = {
	email: string
	password: string
}

export type SignInInfos = LoginInfos & { firstName: string, confirmPassword: string }

export type UserContextInfos = {
	id: string
	firstName: string
	email: string
	isVerified: boolean
	createdAt: string
}

export type UserInfosResponse = {
	_id: string
	email: string
	firstName: string
	isVerified: boolean
	createdAt: string
}

export type PasswordValidationType = {
	isValid: boolean;
	numberOfValidations: number
	validations: {
		minLength: boolean;
		hasUpperCase: boolean;
		hasLowerCase: boolean;
		hasDigit: boolean;
		hasSpecialChar: boolean;
	};
}
