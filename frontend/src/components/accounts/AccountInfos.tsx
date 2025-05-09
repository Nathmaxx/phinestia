import { Account } from "../../types/accounts"
import { formatDate } from "../../utils/date"

type AccountInfosProps = {
	account: Account
}

const AccountInfos = ({ account }: AccountInfosProps) => {
	return (
		<div>
			<p className="font-figtree text-2xl font-semibold text-sky-dark-violet">{account.name}</p>
			<p>Solde : {account.amount.toLocaleString('fr-FR', {
				style: 'currency',
				currency: 'EUR',
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			})}</p>
			<p className="text-gray-600">Dernière mise à jour : {formatDate(account.updatedAt)}</p>
		</div>
	)
}

export default AccountInfos