import { useState } from "react"
import Select from "../Select"
import TextInput from "../Inputs/TextInput"
import { Account } from "../../types/accounts"
import { useAccount } from "../../hooks/useAccountContext"
import { CategoryName } from "../../types/categories"
import Button from "../buttons/Button"
import { successToastMessage } from "../../utils/toastify"
import { updateAmount, validateAmount } from "../../utils/validation"
import Message from "../Message"

type TransfertProps = {
	account: Account
}

const Transfert = ({ account }: TransfertProps) => {

	const { categoryNames, categoryTransfert } = useAccount()

	const categories = categoryNames(account.name)

	const getInitialValues = () => {
		if (categories && categories.length >= 2) {
			return { name: categories[0].name, id: categories[0].id }
		}
		return { name: '', id: '' }
	}
	const [initialCategory, setInitialCategory] = useState<CategoryName>(getInitialValues)
	const [finalCategory, setFinalCategory] = useState<CategoryName>(getInitialValues)
	const [amount, setAmount] = useState("")
	const [message, setMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)


	const handleTransfert = async () => {
		console.log(initialCategory, finalCategory, amount)
		setIsLoading(true)
		setMessage("")

		const validAmount = validateAmount(amount)
		if (!validAmount) {
			setMessage("Veuillez entrer une valeur correcte")
			setIsLoading(false)
			return
		}

		if (initialCategory.name === finalCategory.name) {
			setMessage("Veuillez entrer deux catégories différentes")
			setIsLoading(false)
			return
		}

		const parsedAmount = parseFloat(amount)
		if (isNaN(parsedAmount)) {
			setMessage("Montant incorect")
			setIsLoading(false)
			return
		}

		if (parsedAmount === 0) {
			setMessage("Le montant 0 n'est pas valide")
			setIsLoading(false)
			return
		}

		const accountCategory = account.categories.find(category => category.name === initialCategory.name)
		if (accountCategory && (accountCategory.amount || 0) > parsedAmount) {
			const response = await categoryTransfert(account.id, initialCategory.id, finalCategory.id, parsedAmount)
			if (response.success) {
				successToastMessage("Transfert réalisé")
				setInitialCategory(getInitialValues)
				setFinalCategory(getInitialValues)
				setAmount("")
				setIsLoading(false)
				return
			} else {
				setMessage(response.message)
				setIsLoading(false)
				return
			}
		} else {
			setMessage(`Vous ne disposez pas du montant nécessaire pour la catégorie ${initialCategory.name}`)
			setIsLoading(false)
			return
		}
	}

	return (
		<div className="p-2 shadow-md rounded-lg font-figtree w-[500px]">
			{categories && categories.length >= 2 &&
				<>
					<h2 className="font-semibold text-xl font-bricolage text-sky-dark-violet">Transfert entre les catégories</h2>
					<div className="grid grid-cols-3 gap-x-3 mt-2">
						<p className="text-sm">Catégorie initiale</p>
						<p className="text-sm">Catégorie finale</p>
						<p className="text-sm">Montant</p>

						<Select
							id="initial-category"
							name="initial-category"
							onChange={setInitialCategory}
							options={categories}
							className="block border border-gray-300 rounded-md px-1 py-0.5"
						/>
						<Select
							id="final-category"
							name="final-category"
							onChange={setFinalCategory}
							options={categories}
							className="block border border-gray-300 rounded-md px-1 py-0.5"
						/>
						<div className="relative">
							<TextInput
								setValue={(v) => updateAmount(v, setAmount)}
								value={amount}
								className="block pr-5"
							/>
							<span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-500">
								€
							</span>
						</div>
					</div>
					<Button
						onClick={handleTransfert}
						className="py-0.5 px-2 bg-sky-violet font-figtree font-medium text-white rounded-md mt-2"
						isLoading={isLoading}
					>
						Transférer
					</Button>
					<Message message={message} className="mt-2 text-sm" />
				</>
			}
			{
				!categories || categories.length < 2 && (
					<p className="text-gray-600">Vous n'avez pas assez de catégories pour réaliser des transferts</p>
				)
			}
		</div>
	)
}

export default Transfert