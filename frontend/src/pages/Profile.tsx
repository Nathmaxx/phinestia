import { useState } from "react"
import ProfileHeader from "../components/profile/ProfileHeader"
import PersonalInfoTab from "../components/profile/PersonalInfosTab"
import SecurityTab from "../components/profile/SecurityTab"
import { useAuth } from "../hooks/useAuthContext"
import { User, Lock } from "lucide-react"
import PageTabs from "../components/PageTabs"

const Profile = () => {
	const { userInfos } = useAuth()
	const [activeTab, setActiveTab] = useState("personal")

	const tabs = [
		{ id: "personal", label: "Informations personnelles", icon: User },
		{ id: "security", label: "Sécurité", icon: Lock },
	]

	return (
		<div className="w-full min-h-screen bg-sky-semiviolet/10 py-10 font-figtree">
			<div className="max-w-4xl mx-auto">
				<ProfileHeader
					firstName={userInfos.firstName}
					email={userInfos.email}
					createdAt={userInfos.createdAt}
				/>

				<div className="bg-white rounded-2xl shadow-md mt-6 p-6">
					<PageTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

					<div className="mt-6">
						{activeTab === "personal" && <PersonalInfoTab />}
						{activeTab === "security" && <SecurityTab />}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profile