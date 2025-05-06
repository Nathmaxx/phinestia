import express from "express"
import { addAccount, deleteAccount, getAccounts, updateAccount } from "../controllers/account.controllers"

const router = express.Router()

router.post('/add/', addAccount)
router.get('/:userid', getAccounts)
router.delete('/:accountid', deleteAccount)
router.put('/:accountid', updateAccount)

export default router