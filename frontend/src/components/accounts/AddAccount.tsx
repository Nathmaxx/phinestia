import { useState } from "react"
import SubmitButton from "../buttons/SubmitButton"
import TextInput from "../Inputs/TextInput"
import Message from "../Message"
import { useAccount } from "../../hooks/useAccountContext"

const AddAccount = () => {

	const { addAccount } = useAccount()

	const [name, setName] = useState("")
	const [amount, setAmount] = useState("")
	const [nameError, setNameError] = useState("")
	const [amountError, setAmountError] = useState("")
	const [message, setMessage] = useState("")

	const handleAddAccount = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setMessage("")
		const validAmount = validateAmount(amount)
		const validName = validateName(name)

		if (!validAmount || !validName) {
			return
		}
		const parsedAmount = parseFloat(amount)

		const response = await addAccount(name, parsedAmount)
		if (!response.success) {
			setMessage(response.message)
			setTimeout(() => setMessage(""), 3000)
			return
		}

		setMessage("Compte ajouté avec succès")
		setAmount("")
		setName("")
		setTimeout(() => setMessage(""), 3000)
	}

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
		<form
			onSubmit={handleAddAccount}
			className="w-[300px]"
		>
			<p className="font-bricolage font-medium text-lg">Ajouter un compte</p>
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
			<SubmitButton className="my-3">Ajouter</SubmitButton>
			<Message message={message} />
		</form>
	)
}

export default AddAccount