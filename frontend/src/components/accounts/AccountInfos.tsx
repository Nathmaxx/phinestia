import TextInput from "../Inputs/TextInput"

type AccountInfosProps = {
	amount: string
	name: string
	nameError: string
	amountError: string
	setAmount: (value: string) => void
	setName: (value: string) => void
	setNameError: (value: string) => void
	setAmountError: (value: string) => void
}

const AccountInfos = ({ amount, name, amountError, nameError, setAmount, setName, setNameError, setAmountError }: AccountInfosProps) => {

	const validateName = (value: string) => {
		setName(value)

		if (!value.trim()) {
			return false
		} else if (value.trim().length < 2) {
			setNameError("Le nom doit contenir au moins 2 caractères")
			return false
		} else if (value.trim().length > 30) {
			setNameError("Le nom ne doit pas dépasser 30 caractères")
			return false
		} else {
			setNameError("")
			return true
		}
	}

	const validateAmount = (value: string) => {
		const sanitizedValue = value.replace(/[^\d.,]/g, '')

		setAmount(sanitizedValue)

		if (!sanitizedValue) {
			return false
		}

		const numericValue = sanitizedValue.replace(',', '.')

		if (isNaN(parseFloat(numericValue))) {
			setAmountError("Le montant doit être un nombre valide")
			return false
		}

		if (numericValue.includes('.') && numericValue.split('.')[1].length > 2) {
			setAmountError("Le montant ne doit pas avoir plus de 2 décimales")
			return false
		}

		if (parseFloat(numericValue) > 999999999.99) {
			setAmountError("Le montant est trop élevé")
			return false
		}

		setAmountError("")
		return true
	}


	return (
		<>
			<p className="font-figtree mt-3">Nom</p>
			<TextInput
				value={name}
				setValue={validateName}
				placeholder="Ex : Livret A, Compte commun"
			/>
			<p className="text-red-600 text-sm italic">{nameError}</p>

			<p className="font-figtree mt-3">Montant</p>
			<div className="relative">
				<TextInput
					value={amount}
					setValue={validateAmount}
					placeholder="2371.45"
					className="pr-5"
				/>
				<span className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500">
					€
				</span>
			</div>
			<p className="text-red-600 text-sm italic">{amountError}</p>
		</>
	)
}

export default AccountInfos