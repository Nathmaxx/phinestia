import express from "express"
import { addAccount, deleteAccount, getAccounts, updateAccount } from "../controllers/account.controllers"

const router = express.Router()

router.post('/add/:userid', addAccount)
router.get('/:userid', getAccounts)
router.delete('/:userid', deleteAccount)
router.put('/:userid', updateAccount)

export default router