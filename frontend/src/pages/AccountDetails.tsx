
import { useParams } from "react-router-dom"
import { useAccount } from "../hooks/useAccountContext"
import { AccountParams } from "../types/pages"
import CategoryList from "../components/categories/CategoryList"
import AccountInfos from "../components/accounts/AccountInfos"
import UpdateAmount from "../components/categories/UpdateAmount"

const AccountDetails = () => {

	const params = useParams() as AccountParams
	const { findAccount } = useAccount()

	const account = findAccount(params.accountname)

	if (!account) {
		return (
			<div className="flex items-center justify-center w-full h-screen">
				Le compte n'existe pas
			</div>
		)
	}

	return (
		<div
			className="flex items-center justify-center w-full h-screen gap-8"
		>
			<AccountInfos account={account} />
			<CategoryList categories={account.categories} />
			<UpdateAmount account={account} />
		</div>
	)
}

export default AccountDetails