import AddAccount from "../components/accounts/AddAccount"



const Accounts = () => {

	return (
		<div
			className="w-full h-screen flex items-center justify-center"
		>
			<AddAccount />
			<Accounts />
		</div>
	)
}

export default Accounts