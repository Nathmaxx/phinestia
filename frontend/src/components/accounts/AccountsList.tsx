import { useState } from 'react';
import { ChevronDown, ChevronUp, Pencil, Trash2, WalletMinimal } from 'lucide-react';
import { useAccount } from '../../hooks/useAccountContext';
import Modal from '../modals/Modal';
import UpdateAccountModal from '../modals/UpdateAccountModal';
import ModalButtons from '../modals/ModalButtons';
import { Link } from 'react-router-dom';
import { formatDateString, formatEuro } from '../../utils/format';


const AccountsList = () => {
	const [showActions, setShowActions] = useState<string | null>(null);
	const { accounts, deleteAccount } = useAccount()

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
	const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

	const totalAmount = accounts.reduce((sum, account) => sum + account.amount, 0);

	const toggleActions = (id: string) => {
		if (showActions === id) {
			setShowActions(null);
		} else {
			setShowActions(id);
		}
	};

	return (
		<div className="w-[500px] bg-white rounded-2xl shadow-md p-4 font-figtree">
			<div className="flex justify-between items-center mb-3">
				<h2 className="text-2xl font-bricolage font-semibold text-sky-dark-violet">
					Mes comptes
				</h2>
				<div className="text-right">
					<p className="text-sm text-gray-500">Total</p>
					<p className="text-2xl font-semibold text-sky-dark-violet">
						{formatEuro(totalAmount)}
					</p>
				</div>
			</div>

			{accounts.length === 0 ? (
				<div className="text-center py-6 text-gray-500">
					Vous n'avez pas encore ajouté de compte.
				</div>
			) : (
				<div className="space-y-1.5">
					{accounts.map((account) => (
						<div
							key={account.id}
							className="bg-sky-violet/5 rounded-lg p-1.5 transition-all hover:shadow-sm"
						>
							<div
								onClick={() => toggleActions(account.id)}
								className="flex justify-between items-center cursor-pointer"
							>
								<div>
									<h3 className="font-medium text-gray-800">{account.name}</h3>
									<p className="text-xs text-gray-500 mt-1">
										Mis à jour le {formatDateString(account.updatedAt)}
									</p>
								</div>
								<div className="flex items-center gap-3">
									<p className="text-lg font-semibold text-sky-dark-violet">
										{formatEuro(account.amount)}
									</p>
									<button
										className="p-1 rounded-full hover:bg-sky-semiviolet/10 transition-colors cursor-pointer"
									>
										{showActions === account.id ? (
											<ChevronUp size={18} className="text-gray-500" />
										) : (
											<ChevronDown size={18} className="text-gray-500" />
										)}
									</button>
								</div>
							</div>

							{showActions === account.id && (
								<div className="flex justify-end gap-2 mt-3 pt-3 border-t border-gray-100">
									<Link
										className="flex items-center gap-1 px-2 py-1 text-sm text-sky-violet hover:bg-sky-semiviolet/10 rounded transition-colors"
										to={`/comptes/${account.name}`}
									>
										<WalletMinimal size={14} />
										Voir le compte
									</Link>
									<button
										className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-gray-200/60 rounded transition-colors"
										onClick={() => setIsUpdateModalOpen(true)}
									>
										<Pencil size={14} />
										Modifier
									</button>
									<Modal
										isOpen={isUpdateModalOpen}
										className='w-[450px] p-4'
										onClose={() => setIsUpdateModalOpen(false)}
										title={`Modification de "${account.name}"`}
									>
										<UpdateAccountModal
											initialName={account.name}
											initialAmount={account.amount}
											idAccount={account.id}
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
										className='w-[450px] p-4'
										onClose={() => setIsDeleteModalOpen(false)}
										title={`Suppression de "${account.name}"`}
									>
										<p>En cliquant sur confirmer, le compte <span className='font-semibold'>"{account.name}"</span> sera supprimé si aucune dépense n'est liée à celui-ci</p>
										<ModalButtons
											onClose={() => setIsDeleteModalOpen(false)}
											onConfirm={() => deleteAccount(account.id)}
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
};

export default AccountsList;