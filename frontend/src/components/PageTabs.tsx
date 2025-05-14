import { ElementType } from "react"

type TabType = "personal" | "security"

type ProfileTabsProps = {
	tabs: { id: string, label: string, icon: ElementType }[]
	activeTab: string
	setActiveTab: (tab: string) => void
	className?: string
}

const PageTabs = ({ tabs, activeTab, setActiveTab, className = "" }: ProfileTabsProps) => {

	return (
		<div className={`flex border-b border-gray-200 mt-3 gap-x-3 ${className}`}>
			{tabs.map((tab) => {
				const Icon = tab.icon
				return (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id as TabType)}
						className={`
							flex items-center py-1.5 px-2 my-1.5 text-sm transition-all font-figtree hover:bg-gray-100 hover:-translate-y-0.5 rounded-md
							${activeTab === tab.id ? "font-semibold text-sky-dark-violet" : ''}
						`}
					>
						<Icon size={18} className="mr-2" />
						{tab.label}
					</button>
				)
			})}
		</div>
	)
}

export default PageTabs