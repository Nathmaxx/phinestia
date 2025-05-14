
import { useParams } from "react-router-dom"
import { useAccount } from "../hooks/useAccountContext"
import { AccountParams } from "../types/pages"
import PageTabs from "../components/PageTabs"
import { useState } from "react"
import { LayoutDashboard, Tags } from "lucide-react"
import AccountPreview from "../components/accounts/AccountPreview"
import AccountCategories from "../components/accounts/AccountCategories"

const AccountDetails = () => {

	const params = useParams() as AccountParams
	const { findAccount } = useAccount()

	const account = findAccount(params.accountname)

	const [activeTab, setActiveTab] = useState("preview")
	const tabs = [
		{ id: "preview", label: "Aperçu", icon: LayoutDashboard },
		{ id: "categories", label: "Catégories", icon: Tags },
		//{ id: "transactions", label: "Transactions", icon: Receipt },
		//{ id: "statistics", label: "Statistiques", icon: PieChart },
		//{ id: "transferts", label: "Transferts", icon: ArrowLeftRight }
	]

	if (!account) {
		return (
			<div className="flex items-center justify-center w-full h-screen">
				Le compte n'existe pas
			</div>
		)
	}

	return (
		<div
			className="flex flex-col items-center justify-center w-full h-screen gap-8"
		>
			<PageTabs
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				tabs={tabs}
			/>
			{activeTab === "preview" && <AccountPreview account={account} />}
			{activeTab === "categories" && <AccountCategories account={account} />}
		</div>
	)
}

export default AccountDetails