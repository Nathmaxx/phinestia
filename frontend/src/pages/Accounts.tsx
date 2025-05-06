import AccountsList from "../components/accounts/AccountsList"
import AddAccount from "../components/accounts/AddAccount"



const Accounts = () => {

	return (
		<div
			className="w-full h-screen flex items-center justify-center gap-10"
		>
			<AddAccount />
			<AccountsList />
		</div>
	)
}

export default Accounts