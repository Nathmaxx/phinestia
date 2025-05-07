import { useState } from "react"
import AccountInfos from "../accounts/AccountInfos"
import ModalButtons from "./ModalButtons"
import { useAccount } from "../../hooks/useAccountContext"

type UpdateAccountModalProps = {
	initialName: string
	initialAmount: number
	idAccount: string
	setIsOpen: (value: boolean) => void
}

const UpdateAccountModal = ({ initialAmount, initialName, setIsOpen, idAccount }: UpdateAccountModalProps) => {

	const { updateAccount } = useAccount()

	const [name, setName] = useState(initialName)
	const [amount, setAmount] = useState(initialAmount.toString())
	const [nameError, setNameError] = useState("")
	const [amountError, setAmountError] = useState("")

	return (
		<>
			<div className="relative">
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
			</div>
			<ModalButtons
				onClose={() => setIsOpen(false)}
				onConfirm={() => {
					updateAccount(idAccount, name, parseFloat(amount))
					setIsOpen(false)
				}}
			/>
		</>
	)
}

export default UpdateAccountModal