import { Account } from "../../types/accounts"
import CategoryList from "../categories/CategoryList"
import UpdateAmount from "../categories/UpdateAmount"
import AccountInfos from "./AccountInfos"

type AccountPreviewProps = {
	account: Account
}

const AccountPreview = ({ account }: AccountPreviewProps) => {
	return (
		<div className="flex">
			<AccountInfos account={account} />
			<CategoryList account={account} />
			<UpdateAmount account={account} />
		</div>
	)
}

export default AccountPreview