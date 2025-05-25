import { TriangleAlert } from "lucide-react"
import { Account } from "../../types/accounts"
import Modal from "../modals/Modal"
import ModalButtons from "../modals/ModalButtons"
import { useCallback, useEffect, useState } from "react"
import { formatEuro } from "../../utils/format"
import TextInput from "../Inputs/TextInput"
import { useAccount } from "../../hooks/useAccount"
import { successToastMessage } from "../../utils/toastify"

type UpdateAmountProps = {
	account: Account
}

const UpdateAmount = ({ account }: UpdateAmountProps) => {

	/** Montant du compte */
	const amount = account.amount

	/** Somme des montants des catégories dans l'objet passé en props */
	const sumCategoriesAmount = account.categories.reduce((acc, cur) => acc + (cur.amount || 0), 0)

	/** Catégories du compte */
	const categories = account.categories

	/** Création de l'objet pour gérer les inputs, passage des valeurs en string  */
	const createInitialValues = useCallback(() => categories.map((category) => ({
		id: category.id,
		name: category.name,
		amount: category.amount ? category.amount.toString() : "0.00",
	})), [categories])

	useEffect(() => {
		setCategoriesAmounts(createInitialValues())
	}, [createInitialValues, account.categories])

	/** Appel le backend pour mettre à jour les nouveaux montants dans la base de données */
	const { updateCategoriesAmounts } = useAccount()

	/** Gestion de l'ouverture de la modale */
	const [isModalOpen, setIsModalOpen] = useState(false)

	/** Initialisation des montants pour chacune des catégories */
	const [categoriesAmounts, setCategoriesAmounts] = useState(createInitialValues())

	/** Somme des montants des catégories */
	const [sumAmountInputs, setSumAmountInputs] = useState(
		categoriesAmounts.reduce((acc, cur) => acc + (parseFloat(cur.amount) || 0), 0)
	)

	/**
	 * Mise à jour de la valeur d'une catégorie
	 * @param name nom de la catégorie
	 * @param value valeur de la catégorie
	 * @returns /
	 */
	const updateCategoryAmount = (name: string, value: string) => {
		const sanitizedValue = value.replace(/[^\d.,]/g, '')
		const numericValue = sanitizedValue.replace(',', '.')

		const parts = numericValue.split('.');

		if (parts[0].length > 9 || (parts[1] && parts[1].length > 2) || parts.length === 3) {
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

	/** Met à jour la somme des montants lors du changement de categoriesAmounts */
	useEffect(() => {
		const sum = categoriesAmounts.reduce((acc, cur) => (parseFloat(cur.amount) || 0) + acc, 0)
		setSumAmountInputs(sum)
	}, [categoriesAmounts])

	/** Fonction de confirmation, envoie les nouvelles données au backend */
	const handleConfirm = async () => {
		if (Math.abs(account.amount - sumAmountInputs) < 0.001) {

			const updatedCategories = categoriesAmounts.map((category) => {
				const parsedAmount = parseFloat(category.amount)
				return {
					id: category.id,
					name: category.name,
					amount: isNaN(parsedAmount) ? 0 : parsedAmount,
				}
			})
			await updateCategoriesAmounts(account.id, updatedCategories)
			successToastMessage("Montants mis à jour")
			return { success: true, message: "Montants mis à jour" }
		}
		return { success: false, message: "Le montant restant doit être nul" }
	}

	/** Affichage du composant si la valeur absolue du montant total - la somme des montants est supérieure à 0.001 */
	return (
		Math.abs(amount - sumCategoriesAmount) > 0.001 && (
			<div className="py-2 px-3 bg-orange-50 rounded-lg border border-orange-300 w-full">
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
						setCategoriesAmounts(createInitialValues())
					}}
					title="Mise à jour des montants"
					className="p-2 w-[400px]"
				>
					<div className="flex flex-col gap-1">
						{
							categoriesAmounts.map((category) => {
								return (
									<div className="flex w-full" key={category.name}>
										<p className="w-1/2">{category.name}</p>
										<div className="relative w-1/2">
											<TextInput
												setValue={(v) => updateCategoryAmount(category.name, v)}
												value={category.amount}
												className="pr-5"
											/>
											<span className="absolute right-0.5 top-1/2 -translate-1/2 text-gray-500">€</span>
										</div>
									</div>
								)
							})
						}
					</div>
					<span className="w-full block h-px bg-amber-600 my-2"></span>
					<p>Montant restant à répartir : <span className="font-semibold">{formatEuro(Math.round((account.amount - sumAmountInputs) * 100) / 100 + 0)}</span></p>
					{
						account.amount - sumAmountInputs < - 0.001 && <p className="text-red-600 text-sm italic">Le montant ne peux pas être négatif</p>
					}
					<ModalButtons
						onClose={() => {
							setIsModalOpen(false)
							setCategoriesAmounts(createInitialValues())
						}}
						onConfirm={handleConfirm}
					/>
				</Modal>
			</div >
		)
	)
}

export default UpdateAmount