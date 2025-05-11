import { TriangleAlert } from "lucide-react"
import { Account } from "../../types/accounts"
import Modal from "../modals/Modal"
import ModalButtons from "../modals/ModalButtons"
import { useState } from "react"
import { formatEuro } from "../../utils/format"
import TextInput from "../Inputs/TextInput"

type UpdateAmountProps = {
	account: Account
}

const UpdateAmount = ({ account }: UpdateAmountProps) => {

	const amount = account.amount
	const sumCategoriesAmount = account.categories.reduce((acc, cur) => acc + (cur.amount || 0), 0)
	const categories = account.categories

	const initialAmounts = categories.reduce<Record<string, string>>((acc, cur) => {
		acc[cur.name] = cur.amount ? cur.amount.toString() : "0.00"
		return acc
	}, {})

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [categoriesAmounts, setCategoriesAmounts] = useState(initialAmounts)

	const sumCategoriesInputs = Object.values(categoriesAmounts).reduce((acc, cur) => acc + parseFloat(cur) || 0, 0)

	const setAmount = (category: string, value: string) => {
		const sanitizedValue = value.replace(/[^\d.,]/g, '')
		setCategoriesAmounts({
			...categoriesAmounts,
			[category]: sanitizedValue
		})
	}

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
						setCategoriesAmounts(initialAmounts)
					}}
					title="Mise à jour des montants"
					className="p-2"
				>
					{
						Object.entries(categoriesAmounts).map(([key, value]) => (
							<div className="relative flex">
								<p key={key}>{key}</p>
								<TextInput
									setValue={(newValue) => setAmount(key, newValue)}
									value={value.toString()}
									className="pr-5"
								/>
								<span className="absolute right-0.5 top-1/2 -translate-1/2">€</span>
							</div>
						))
					}
					<span className="w-full block h-px bg-amber-600 my-2"></span>
					<p>Montant restant à répartir : <span className="font-semibold">{formatEuro(account.amount - sumCategoriesInputs)}</span></p>
					<ModalButtons
						onClose={() => {
							setIsModalOpen(false)
							setCategoriesAmounts(initialAmounts)
						}}
						onConfirm={async () => await new Promise(r => setTimeout(() => r({ success: true, message: "Montants mis à jour" }), 500))}
					/>
				</Modal>
			</div>
		)
	)
}

export default UpdateAmount