import { Account } from "../../types/accounts"
import CategoryList from "../categories/CategoryList"
import UpdateAmount from "../categories/UpdateAmount"

type AccountPreviewProps = {
	account: Account
}

const AccountPreview = ({ account }: AccountPreviewProps) => {
	return (
		<div className="flex">
			<CategoryList account={account} />
			<UpdateAmount account={account} />
		</div>
	)
}

export default AccountPreview