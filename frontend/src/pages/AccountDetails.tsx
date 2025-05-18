import { useParams } from "react-router-dom"
import { useAccount } from "../hooks/useAccountContext"
import { AccountParams } from "../types/pages"
import PageTabs from "../components/PageTabs"
import { useState, useRef, useLayoutEffect } from "react"
import { LayoutDashboard, Receipt, Tags } from "lucide-react"
import AccountPreview from "../components/accounts/AccountPreview"
import AccountCategories from "../components/accounts/AccountCategories"
import AccountInfos from "../components/accounts/AccountInfos"
import gsap from "gsap"
import AccountTransactions from "@/components/accounts/AccountTransactions"

const AccountDetails = () => {
	const params = useParams() as AccountParams
	const { findAccount } = useAccount()
	const account = findAccount(params.accountname)

	const [activeTab, setActiveTab] = useState("preview")
	const [previousTab, setPreviousTab] = useState("")
	const contentRef = useRef<HTMLDivElement>(null)

	const tabs = [
		{ id: "preview", label: "Aperçu", icon: LayoutDashboard },
		{ id: "categories", label: "Catégories", icon: Tags },
		{ id: "transactions", label: "Transactions", icon: Receipt },
		//{ id: "statistics", label: "Statistiques", icon: PieChart },
		//{ id: "transferts", label: "Transferts", icon: ArrowLeftRight }
	]

	// Fonction pour changer d'onglet avec animation
	const handleTabChange = (tabId: string) => {
		if (tabId === activeTab) return

		setPreviousTab(activeTab)
		setActiveTab(tabId)
	}

	// Animation lors du changement d'onglet
	useLayoutEffect(() => {
		if (!contentRef.current) return

		// Si c'est le premier rendu (pas de précédent onglet), pas d'animation
		if (!previousTab) return

		const ctx = gsap.context(() => {
			// Animation de sortie
			gsap.fromTo(
				contentRef.current,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.5,
					ease: "power1.out"
				}
			)
		})

		return () => ctx.revert()
	}, [activeTab, previousTab])

	if (!account) {
		return (
			<div className="flex items-center justify-center w-full h-screen">
				Le compte n'existe pas
			</div>
		)
	}

	return (
		<div className="flex justify-center">
			<div className="w-4/5">
				<AccountInfos account={account} />

				<PageTabs
					activeTab={activeTab}
					setActiveTab={handleTabChange}
					tabs={tabs}
				/>

				<div ref={contentRef} className="mt-4">
					{activeTab === "preview" && <AccountPreview account={account} />}
					{activeTab === "categories" && <AccountCategories account={account} />}
					{activeTab === "transactions" && <AccountTransactions account={account} />}
				</div>
			</div>
		</div>
	)
}

export default AccountDetails