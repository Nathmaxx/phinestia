import { Account } from "../../types/accounts"
import CategoryList from "../categories/CategoryList"
import UpdateAmount from "../categories/UpdateAmount"
import DonutChart from "../charts/DonutChart"

type AccountPreviewProps = {
	account: Account
}

const AccountPreview = ({ account }: AccountPreviewProps) => {

	const generateColor = (index: number) => {
		const hue = (index * (360 / account.categories.length)) % 360;
		const saturation = 50;
		const lightness = 75;
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	};

	const categoriesData = account.categories.map((category, index) => {
		return {
			label: category.name,
			value: category.amount || 0,
			color: generateColor(index)
		}
	})

	return (
		<div className="flex gap-4">
			<div>
				<CategoryList account={account} />
			</div>
			<div className="p-4 rounded-2xl shadow-lg">
				<h2 className="mb-3 text-2xl font-semibold font-bricolage text-sky-dark-violet">Répartition des catégories</h2>
				<DonutChart radius={150} thickness={50} data={categoriesData} />
			</div>
			<UpdateAmount account={account} />
		</div>
	)
}

export default AccountPreview