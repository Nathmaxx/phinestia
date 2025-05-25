import { useState } from "react"
import AccountInputs from "../accounts/AccountInputs"
import ModalButtons from "./ModalButtons"
import { useAccount } from "../../hooks/useAccount"

type UpdateAccountModalProps = {
	initialName: string
	initialAmount: number
	idAccount: string
	setIsOpen: (value: boolean) => void
}

const UpdateAccountModal = ({ initialAmount, initialName, setIsOpen, idAccount }: UpdateAccountModalProps) => {

	const { updateAccountInfos } = useAccount()

	const [name, setName] = useState(initialName)
	const [amount, setAmount] = useState(initialAmount.toString())
	const [nameError, setNameError] = useState("")
	const [amountError, setAmountError] = useState("")

	const updateInfos = async () => {
		if (nameError || amountError) {
			return { success: false, message: "" }
		}
		return await updateAccountInfos(idAccount, name, parseFloat(amount))
	}

	return (
		<>
			<div className="relative">
				<AccountInputs
					amount={amount}
					amountError={amountError}
					name={name}
					nameError={nameError}
					setAmount={setAmount}
					setAmountError={setAmountError}
					setName={setName}
					setNameError={setNameError}
				/>
			</div>
			<ModalButtons
				onClose={() => setIsOpen(false)}
				onConfirm={updateInfos}
			/>
		</>
	)
}

export default UpdateAccountModal