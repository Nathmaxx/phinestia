import { useState } from "react";
import { ChartPie, BarChart3 } from "lucide-react";
import { Account } from "../../types/accounts";
import CategoryList from "../categories/CategoryList";
import UpdateAmount from "../categories/UpdateAmount";
import DonutChart from "../charts/DonutChart";
import LabelBarChart from "../charts/LabelBarChart";

type AccountPreviewProps = {
	account: Account;
};

const AccountPreview = ({ account }: AccountPreviewProps) => {
	// État pour suivre le type de graphique actif
	const [chartType, setChartType] = useState<"donut" | "bar">("donut");

	const generateColor = (index: number) => {
		const hue = (index * (360 / account.categories.length)) % 360;
		const saturation = 50;
		const lightness = 75;
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	};

	const categoriesData = account.categories.map((category, index) => {
		return {
			label: category.name,
			value: category.amount ? Math.round(category.amount * 100) / 100 : 0,
			color: generateColor(index),
		};
	});

	return (
		<div className="flex gap-4 font-figtree">
			<div>
				<CategoryList account={account} />
				<UpdateAmount account={account} />
			</div>
			<div className="p-4 rounded-2xl shadow-lg relative w-[800px]">
				<div className="flex items-center justify-between mb-3">
					<h2 className="text-2xl font-semibold font-bricolage text-sky-dark-violet">
						Répartition des catégories
					</h2>

					{/* Groupe de boutons pour switcher entre types de graphiques */}
					<div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
						<button
							className={`flex items-center px-3 py-1.5 transition-colors ${chartType === "donut"
								? "bg-sky-dark-violet text-white"
								: "hover:bg-gray-200 text-gray-600"
								}`}
							onClick={() => setChartType("donut")}
							title="Affichage en camembert"
						>
							<ChartPie size={18} />
							<span className="ml-2 text-sm font-medium">Camembert</span>
						</button>
						<button
							className={`flex items-center px-3 py-1.5 transition-colors ${chartType === "bar"
								? "bg-sky-dark-violet text-white"
								: "hover:bg-gray-200 text-gray-600"
								}`}
							onClick={() => setChartType("bar")}
							title="Affichage en barres"
						>
							<BarChart3 size={18} />
							<span className="ml-2 text-sm font-medium">Barres</span>
						</button>
					</div>
				</div>

				{chartType === "donut" ? (
					<DonutChart radius={150} thickness={50} data={categoriesData} />
				) : (
					<LabelBarChart data={categoriesData} />
				)}
			</div>
		</div>
	);
};

export default AccountPreview;