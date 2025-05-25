
import express from "express"
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from "../controllers/transaction.controllers"

const router = express.Router()

router.post('/account/:accountid/category/:categoryid', addTransaction)
router.get('/:userid', getTransactions)
router.delete('/:userid', deleteTransaction)
router.put('/:userid', updateTransaction)

export default router