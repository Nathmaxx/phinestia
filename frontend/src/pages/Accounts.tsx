import AccountsList from "../components/accounts/AccountsList"
import AddAccount from "../components/accounts/AddAccount"
import AddCategory from "../components/categories/AddCategory"


const Accounts = () => {

	return (
		<div
			className="w-full h-screen flex items-center justify-center gap-10"
		>
			<div>
				<AddAccount />
				<AddCategory className="mt-4" />
			</div>
			<AccountsList />
		</div>
	)
}

export default Accounts