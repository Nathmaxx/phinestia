
import { Account } from '@/types/accounts'
import AddTransaction from '../transactions/AddExpense'
//import TransactionList from '../transactions/TransactionList'

type AccountTransactionsProps = {
	account: Account
}

const AccountTransactions = ({ account }: AccountTransactionsProps) => {
	return (
		<div className='flex justify-center'>
			<div className='w-[350px]'>
				<AddTransaction accountName={account.name} />
			</div>
			{/* <TransactionList /> */}
		</div>
	)
}

export default AccountTransactions