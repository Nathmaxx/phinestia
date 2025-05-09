import { TriangleAlert } from "lucide-react"
import { Account } from "../../types/accounts"

type UpdateAmountProps = {
	account: Account
}

const UpdateAmount = ({ account }: UpdateAmountProps) => {

	const amount = account.amount
	const sumCategoriesAmount = account.categories.reduce((acc, cur) => acc + (cur.amount || 0), 0)


	return (
		amount !== sumCategoriesAmount && (
			<div className="py-2 px-3 bg-orange-50 rounded-md border border-orange-300">
				<p className="text-orange-900 flex items-center"><span className="font-semibold mr-2"><TriangleAlert /></span> La somme des montants des catégories est différente du solde du compte. <br /> Appuyez sur le bouton ci-dessous pour mettre à jour les montants.</p>
				<button className="cursor-pointer px-2 py-0.5 mt-3 rounded font-medium text-orange-800 bg-orange-200/70 hover:bg-orange-200 transition">Mettre à jour</button>
			</div>
		)
	)
}

export default UpdateAmount