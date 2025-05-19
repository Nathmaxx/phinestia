import { Account } from "../../types/accounts"
import { formatDateString, formatEuro } from "../../utils/format"

type AccountInfosProps = {
	account: Account
}

const AccountInfos = ({ account }: AccountInfosProps) => {
	return (
		<div className="w-full mt-4">
			<p className="font-figtree text-2xl font-semibold text-sky-dark-violet">{account.name}, {formatEuro(account.amount)}</p>
			<p className="text-gray-600 text-sm italic">Dernière mise à jour : {formatDateString(account.updatedAt)}</p>
		</div>
	)
}

export default AccountInfos