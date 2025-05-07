import { useState } from "react"
import TextInput from "../Inputs/TextInput"

const UpdateAccountModal = () => {

	const [name, setName] = useState("")
	const [amount, setAmount] = useState("")

	return (
		<>
			<TextInput
				setValue={setName}
				value={name}
				placeholder="Ex : Livret A, Compte commun"
			/>
			<div className="relative">
				<TextInput
					setValue={setAmount}
					value={amount}
					placeholder="2371.45"
					className="pr-5"
				/>
				<span className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500">
					€
				</span>
			</div>
		</>
	)
}

export default UpdateAccountModal