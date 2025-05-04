import { User, Lock } from "lucide-react"

type TabType = "personal" | "security" | "notifications"

type ProfileTabsProps = {
	activeTab: TabType
	setActiveTab: (tab: TabType) => void
}

const ProfileTabs = ({ activeTab, setActiveTab }: ProfileTabsProps) => {
	const tabs = [
		{ id: "personal", label: "Informations personnelles", icon: User },
		{ id: "security", label: "Sécurité", icon: Lock },
	]

	return (
		<div className="flex border-b border-gray-200">
			{tabs.map((tab) => {
				const Icon = tab.icon
				return (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id as TabType)}
						className={`flex items-center px-4 py-3 text-sm font-medium mr-8 transition-all ${activeTab === tab.id
							? "text-sky-violet border-b border-sky-violet"
							: "text-gray-500 hover:text-sky-dark-violet"
							}`}
					>
						<Icon size={16} className="mr-2" />
						{tab.label}
					</button>
				)
			})}
		</div>
	)
}

export default ProfileTabs