import { ElementType } from "react"

type TabType = "personal" | "security"

type ProfileTabsProps = {
	tabs: { id: string, label: string, icon: ElementType }[]
	activeTab: string
	setActiveTab: (tab: string) => void
}

const ProfileTabs = ({ tabs, activeTab, setActiveTab }: ProfileTabsProps) => {

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