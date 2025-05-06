import { useState } from 'react';
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react';
import { useAccount } from '../../hooks/useAccountContext';


const AccountsList = () => {
	const [showActions, setShowActions] = useState<string | null>(null);
	const { accounts, deleteAccount } = useAccount()


	// Formater les montants en EUR
	const formatAmount = (amount: number) => {
		return new Intl.NumberFormat('fr-FR', {
			style: 'currency',
			currency: 'EUR',
		}).format(amount);
	};

	// Formater les dates
	const formatDate = (date: Date) => {
		return new Intl.DateTimeFormat('fr-FR', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		}).format(date);
	};

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
						{formatAmount(totalAmount)}
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
							className="bg-sky-semiviolet/5 rounded-lg p-1.5 transition-all hover:shadow-sm"
						>
							<div className="flex justify-between items-center">
								<div>
									<h3 className="font-medium text-gray-800">{account.name}</h3>
									<p className="text-xs text-gray-500">
										Mis à jour le {formatDate(account.updatedAt)}
									</p>
								</div>
								<div className="flex items-center gap-3">
									<p className="text-lg font-semibold text-sky-dark-violet">
										{formatAmount(account.amount)}
									</p>
									<button
										onClick={() => toggleActions(account.id)}
										className="p-1 rounded-full hover:bg-sky-semiviolet/10 transition-colors"
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
									<button className="flex items-center gap-1 px-2 py-1 text-sm text-gray-600 hover:bg-sky-semiviolet/10 rounded transition-colors">
										<Pencil size={14} />
										Modifier
									</button>
									<button
										className="flex items-center gap-1 px-2 py-1 text-sm text-sky-salmon hover:bg-red-50 rounded transition-colors"
										onClick={() => deleteAccount(account.id)}
									>
										<Trash2 size={14} />
										Supprimer
									</button>
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