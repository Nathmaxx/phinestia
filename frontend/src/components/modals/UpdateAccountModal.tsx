import { useState } from "react"
import AccountInfos from "../accounts/AccountInfos"

type UpdateAccountModalProps = {
	initialName: string
	initialAmount: number
}

const UpdateAccountModal = ({ initialAmount, initialName }: UpdateAccountModalProps) => {

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
		</>
	)
}

export default UpdateAccountModal