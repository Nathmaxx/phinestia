import { useState } from "react"
import SubmitButton from "../buttons/SubmitButton"
import Message from "../Message"
import { useAccount } from "../../hooks/useAccountContext"
import AccountInfos from "./AccountInfos"

const AddAccount = () => {

	const [name, setName] = useState("")
	const [amount, setAmount] = useState("")
	const [nameError, setNameError] = useState("")
	const [amountError, setAmountError] = useState("")
	const [message, setMessage] = useState("")

	const { addAccount } = useAccount()


	const handleAddAccount = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setMessage("")
		if (nameError || amountError) {
			return
		}
		const parsedAmount = parseFloat(amount)

		console.log("ok")
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


	return (
		<form
			onSubmit={handleAddAccount}
			className="w-[300px]"
		>
			<p className="font-bricolage font-medium text-lg">Ajouter un compte</p>
			<AccountInfos
				amount={amount}
				amountError={amountError}
				name={name}
				nameError={nameError}
				setAmount={setAmount}
				setAmountError={setAmountError}
				setName={setName}
				setNameError={setNameError}
			/>
			<SubmitButton className="my-3">Ajouter</SubmitButton>
			<Message message={message} />
		</form>
	)
}

export default AddAccount