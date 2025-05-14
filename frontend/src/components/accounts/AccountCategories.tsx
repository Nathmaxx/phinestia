import { Account } from "../../types/accounts"
import Transfert from "../categories/Transfert"

type AccountCategoriesProps = {
	account: Account
}

const AccountCategories = ({ account }: AccountCategoriesProps) => {
	return (
		<div>
			<Transfert account={account} />
		</div>
	)
}

export default AccountCategories