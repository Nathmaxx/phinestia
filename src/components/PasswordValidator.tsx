import { useEffect, useState } from "react"
import { PasswordValidationType } from "../types/user"

type PasswordValidatorProps = {
	password: string
	setIsValidPassword: (value: boolean) => void
}

const PasswordValidator = ({ password, setIsValidPassword }: PasswordValidatorProps) => {

	const [passwordValidation, setPasswordValidation] = useState<PasswordValidationType>({
		isValid: false,
		numberOfValidations: 0,
		validations: {
			minLength: false,
			hasUpperCase: false,
			hasLowerCase: false,
			hasDigit: false,
			hasSpecialChar: false,
		}
	})

	const validatePassword = (password: string) => {
		const validations = {
			minLength: password.length >= 8,
			hasUpperCase: /[A-Z]/.test(password),
			hasLowerCase: /[a-z]/.test(password),
			hasDigit: /\d/.test(password),
			hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
		}

		const numberOfValidations = Object.values(validations).filter(Boolean).length;
		const isValid = Object.values(validations).every(v => v)

		return { isValid, numberOfValidations, validations }
	}

	useEffect(() => {
		const validation = validatePassword(password)
		setIsValidPassword(validation.isValid)
		setPasswordValidation(validation)
	}, [password, setIsValidPassword])

	return (
		<div className="text-xs">
			<p className={`${passwordValidation.validations.minLength ? "text-green-700" : ""}`}>8 Caractères</p>
			<p className={`${passwordValidation.validations.hasUpperCase ? "text-green-700" : ""}`}>1 Majuscule</p>
			<p className={`${passwordValidation.validations.hasLowerCase ? "text-green-700" : ""}`}>1 Minuscule</p>
			<p className={`${passwordValidation.validations.hasDigit ? "text-green-700" : ""}`}>1 Chiffre</p>
			<p className={`${passwordValidation.validations.hasSpecialChar ? "text-green-700" : ""}`}>1 Caractère spécial</p>
			<div className="flex gap-1">
				<span className={`h-1.5 w-10 ${passwordValidation.numberOfValidations > 0 ? "bg-green-500" : "bg-slate-200"} rounded-full`}></span>
				<span className={`h-1.5 w-10 ${passwordValidation.numberOfValidations > 1 ? "bg-green-500" : "bg-slate-200"} rounded-full`}></span>
				<span className={`h-1.5 w-10 ${passwordValidation.numberOfValidations > 2 ? "bg-green-500" : "bg-slate-200"} rounded-full`}></span >
				<span className={`h-1.5 w-10 ${passwordValidation.numberOfValidations > 3 ? "bg-green-500" : "bg-slate-200"} rounded-full`}></span>
				<span className={`h-1.5 w-10 ${passwordValidation.numberOfValidations > 4 ? "bg-green-500" : "bg-slate-200"} rounded-full`}></span>
			</div >
		</div >
	)
}

export default PasswordValidator