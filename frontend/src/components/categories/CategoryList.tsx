import { useState } from "react"
import { formatEuro } from "../../utils/format"
import { ChevronDown, ChevronUp, Pencil, Trash2 } from "lucide-react"
import { useAccount } from "../../hooks/useAccountContext"
import Modal from "../modals/Modal"
import { Account } from "../../types/accounts"
import UpdateCategoryModal from "../modals/UpdateCategoryModal"
import ModalButtons from "../modals/ModalButtons"

type CategoryListProps = {
	account: Account
}

const CategoryList = ({ account }: CategoryListProps) => {
	const [showActions, setShowActions] = useState<string | null>(null);

	const { deleteCategory } = useAccount()

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

	const categories = account.categories

	const toggleActions = (id: string) => {
		console.log(id)
		if (showActions === id) {
			setShowActions(null);
		} else {
			setShowActions(id);
		}
	};

	return (
		<div className="w-full bg-white rounded-lg shadow-md p-2 font-figtree">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-2xl font-bricolage font-semibold text-sky-dark-violet">
					Mes Catégories
				</h2>
			</div>

			{categories.length === 0 ? (
				<div className="text-center py-6 text-gray-500">
					Vous n'avez pas encore ajouté de catégorie.
				</div>
			) : (
				<div className="space-y-1.5 h-72 overflow-auto thin-scrollbar">
					{categories.map((category) => (
						<div
							key={category.id}
							className="bg-sky-violet/5 rounded-lg py-1 px-3 transition-all hover:shadow-sm"
						>
							<div
								onClick={() => toggleActions(category.id)}
								className="flex justify-between items-center cursor-pointer"
							>
								<div>
									<h3 className="font-medium text-gray-800">{category.name}</h3>
								</div>
								<div className="flex items-center gap-3">
									<p className="text font-semibold text-sky-dark-violet">
										{formatEuro(category.amount || 0)}
									</p>
									<button
										className="p-1 rounded-full hover:bg-sky-semiviolet/10 transition-colors cursor-pointer"
									>
										{showActions === category.id ? (
											<ChevronUp size={18} className="text-gray-500" />
										) : (
											<ChevronDown size={18} className="text-gray-500" />
										)}
									</button>
								</div>
							</div>

							{showActions === category.id && (
								<div className="flex justify-end gap-2 mt-2 pt-2 border-t border-gray-200">
									<button
										className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-200/60 rounded transition-colors"
										onClick={() => setIsUpdateModalOpen(true)}
									>
										<Pencil size={14} />
										Modifier
									</button>
									<Modal
										isOpen={isUpdateModalOpen}
										className='w-[350px] p-4'
										onClose={() => setIsUpdateModalOpen(false)}
										title={`Modification de "${category.name}"`}
									>
										<UpdateCategoryModal
											accountId={account.id}
											categoryId={category.id}
											initialName={category.name}
											setIsOpen={setIsUpdateModalOpen}
										/>
									</Modal>

									<button
										className="flex items-center gap-1 px-2 py-1 text-sm text-red-400 hover:bg-red-50 rounded transition-colors"
										onClick={() => setIsDeleteModalOpen(true)}
									>
										<Trash2 size={14} />
										Supprimer
									</button>
									<Modal
										isOpen={isDeleteModalOpen}
										className='w-[350px] p-4'
										onClose={() => setIsDeleteModalOpen(false)}
										title={`Suppression de "${category.name}"`}
									>
										<p>En cliquant sur confirmer, la catégorie <span className='font-semibold'>"{category.name}"</span> sera supprimé si aucune dépense n'est liée à celle-ci</p>
										<ModalButtons
											onClose={() => setIsDeleteModalOpen(false)}
											onConfirm={() => deleteCategory(account.id, category.id)}
										/>
									</Modal>
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</div>
	);

	// return (
	// 	<div className="w-[300px]">
	// 		<h2 className="font-bricolage text-sky-dark-violet text-2xl font-semibold">Catégories</h2>
	// 		<ul className="w-full">
	// 			{categories.map((category) => {
	// 				return <li className="flex justify-between" key={category.name}>
	// 					<span>{category.name}</span>
	// 					<span>{formatEuro(category.amount || 0)}</span>
	// 				</li>
	// 			})}
	// 		</ul>
	// 	</div>
	// )
}

export default CategoryList