import { TriangleAlert } from "lucide-react"
import { Account } from "../../types/accounts"
import Modal from "../modals/Modal"
import ModalButtons from "../modals/ModalButtons"
import { useState } from "react"
import { formatEuro } from "../../utils/format"
import TextInput from "../Inputs/TextInput"
import { validateAmount } from "../../utils/validation"

type UpdateAmountProps = {
	account: Account
}

const UpdateAmount = ({ account }: UpdateAmountProps) => {

	const amount = account.amount
	const sumCategoriesAmount = account.categories.reduce((acc, cur) => acc + (cur.amount || 0), 0)
	const categories = account.categories

	const initialValues = categories.map((category) => (
		{ name: category.name, amount: category.amount ? category.amount.toString() : "0.00" }
	))

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [categoriesAmounts, setCategoriesAmounts] = useState(initialValues)

	const updateCategoryAmount = (name: string, value: string) => {
		const sanitizedValue = value.replace(/[^\d.,]/g, '')
		const numericValue = sanitizedValue.replace(',', '.')

		const parts = numericValue.split('.');

		if (parts[0].length > 9 || (parts[1] && parts[1].length > 2)) {
			return;
		}

		const newObject = categoriesAmounts.map(category => {
			if (category.name === name) {
				return {
					...category,
					amount: numericValue
				}
			}
			return { ...category }
		})
		setCategoriesAmounts(newObject)
	}

	const sumCategoriesInputs = categoriesAmounts.reduce((acc, cur) => parseFloat(cur.amount) || 0 + acc, 0)

	return (
		amount !== sumCategoriesAmount && (
			<div className="py-2 px-3 bg-orange-50 rounded-md border border-orange-300">
				<p className="text-orange-900 flex items-center"><span className="font-semibold mr-2"><TriangleAlert /></span> La somme des montants des catégories est différente du solde du compte. <br /> Appuyez sur le bouton ci-dessous pour mettre à jour les montants.</p>
				<button
					className="cursor-pointer px-2 py-0.5 mt-3 rounded font-medium text-orange-800 bg-orange-200/70 hover:bg-orange-200 transition"
					onClick={() => setIsModalOpen(true)}
				>
					Mettre à jour
				</button>
				<Modal
					isOpen={isModalOpen}
					onClose={() => {
						setIsModalOpen(false)
						setCategoriesAmounts(initialValues)
					}}
					title="Mise à jour des montants"
					className="p-2"
				>
					{
						categoriesAmounts.map((category) => {
							return (
								<div key={category.name} className="">
									<div className="flex relative">
										<p>{category.name}</p>
										<TextInput
											setValue={(v) => updateCategoryAmount(category.name, v)}
											value={category.amount}
											className="pr-5"
										/>
										<span className="absolute right-0.5 top-1/2 -translate-1/2">€</span>
									</div>
									<p className="text-red-600 text-sm italic">{validateAmount(category.amount)}</p>
								</div>
							)
						})
					}
					<span className="w-full block h-px bg-amber-600 my-2"></span>
					<p>Montant restant à répartir : <span className="font-semibold">{formatEuro(account.amount - sumCategoriesInputs)}</span></p>
					{
						account.amount - sumCategoriesInputs < 0 && <p className="text-red-600 text-sm italic">Le montant ne peux pas être négatif</p>
					}
					<ModalButtons
						onClose={() => {
							setIsModalOpen(false)
							setCategoriesAmounts(initialValues)
						}}
						onConfirm={async () => await new Promise(r => setTimeout(() => r({ success: true, message: "Montants mis à jour" }), 500))}
					/>
				</Modal>
			</div>
		)
	)
}

export default UpdateAmount