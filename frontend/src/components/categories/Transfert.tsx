import { useState } from "react"
import Select from "../Select"
import TextInput from "../Inputs/TextInput"
import { Account } from "../../types/accounts"
import { useAccount } from "../../hooks/useAccountContext"
import { CategoryName } from "../../types/categories"
import Button from "../buttons/Button"
import { successToastMessage } from "../../utils/toastify"

type TransfertProps = {
	account: Account
}

const Transfert = ({ account }: TransfertProps) => {

	const { categoryNames } = useAccount()

	const [initialCategory, setInitialCategory] = useState<CategoryName>({ id: "", name: "" })
	const [finalCategory, setFinalCategory] = useState<CategoryName>({ id: "", name: "" })
	const [amount, setAmont] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const categories = categoryNames(account.name)

	const handleTransfert = () => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			successToastMessage("Transert réalisé")
		}, 500)
	}

	return (
		<div className="flex p-2 shadow rounded-md gap-x-3">
			<Select
				id="initial-category"
				name="initial-category"
				onChange={setInitialCategory}
				options={categories}
				className="block"
			/>
			<Select
				id="final-category"
				name="final-category"
				onChange={setFinalCategory}
				options={categories}
			/>
			<TextInput
				setValue={setAmont}
				value={amount}
				className="block"
			/>
			<Button
				onClick={handleTransfert}
				className="py-0.5 px-2 bg-sky-violet font-figtree font-medium text-white rounded-md"
				isLoading={isLoading}
			>
				Transférer
			</Button>

		</div>
	)
}

export default Transfert