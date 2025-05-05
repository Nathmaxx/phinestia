import { useState } from "react"
import SubmitButton from "../components/buttons/SubmitButton"
import TextInput from "../components/Inputs/TextInput"
import { useAccount } from "../hooks/useAccountContext"
import Message from "../components/Message"

const Accounts = () => {

	const { addAccount } = useAccount()

	const [name, setName] = useState("")
	const [amount, setAmount] = useState("")
	const [nameError, setNameError] = useState("")
	const [amountError, setAmountError] = useState("")
	const [message, setMessage] = useState("")

	const handleAddAccount = async () => {

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
		<div
			className="w-full h-screen flex flex-col items-center justify-center"
		>
			<p className="font-bricolage font-medium text-lg">Ajouter un compte</p>
			<form
				onSubmit={handleAddAccount}
				className="w-[300px]"
			>
				<p className="font-figtree">Nom</p>
				<TextInput
					value={name}
					setValue={validateName}
					placeholder="Livret A"
				/>
				<p className="text-red-600 text-sm italic">{nameError}</p>

				<p className="font-figtree">Montant</p>
				<TextInput
					value={amount}
					setValue={validateAmount}
					placeholder="2371.45"
				/>
				<p className="text-red-600 text-sm italic">{amountError}</p>
				<SubmitButton>Ajouter</SubmitButton>
				<Message message={message} />
			</form>
		</div>
	)
}

export default Accounts