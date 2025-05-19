
import { Account } from '@/types/accounts'
import AddTransaction from '../transactions/AddExpense'
import TransactionList from '../transactions/TransactionList'

type AccountTransactionsProps = {
	account: Account
}

const AccountTransactions = ({ account }: AccountTransactionsProps) => {
	return (
		<div>
			<AddTransaction />
			<TransactionList />
		</div>
	)
}

export default AccountTransactions