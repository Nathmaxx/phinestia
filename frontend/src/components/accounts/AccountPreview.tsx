import { Account } from "../../types/accounts"
import CategoryList from "../categories/CategoryList"
import UpdateAmount from "../categories/UpdateAmount"
import DonutChart from "../charts/DonutChart"

type AccountPreviewProps = {
	account: Account
}

const AccountPreview = ({ account }: AccountPreviewProps) => {



	return (
		<div className="flex gap-4">
			<CategoryList account={account} />
			<div className="p-4 rounded-2xl shadow-lg">
				<DonutChart radius={150} thickness={50} />
			</div>
			<UpdateAmount account={account} />
		</div>
	)
}

export default AccountPreview