import { Account } from "../../types/accounts"
import { formatDate, formatEuro } from "../../utils/format"

type AccountInfosProps = {
	account: Account
}

const AccountInfos = ({ account }: AccountInfosProps) => {
	return (
		<div className="w-[300px]">
			<p className="font-figtree text-2xl font-semibold text-sky-dark-violet">{account.name}</p>
			<p>Solde : {formatEuro(account.amount)}</p>
			<p className="text-gray-600">Dernière mise à jour : {formatDate(account.updatedAt)}</p>
		</div>
	)
}

export default AccountInfos