
import express from "express"
import { addTransaction, deleteTransaction, getTransactions, updateTransaction } from "../controllers/transaction.controllers"
import { validateRequest } from "../middlewares/validateRequest"
import { addTransactionSchema } from "../validation/transaction.validation"

const router = express.Router()

router.post('/account/:accountid/category/:categoryid', validateRequest(addTransactionSchema), addTransaction)
router.get('/:userid', getTransactions)
router.delete('/:userid', deleteTransaction)
router.put('/:userid', updateTransaction)

export default router