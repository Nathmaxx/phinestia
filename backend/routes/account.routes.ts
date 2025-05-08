import express from "express"
import { addAccount, addCategory, deleteAccount, getAccounts, updateAccountInfos } from "../controllers/account.controllers"
import { createAccountSchema, createCategorySchema, deleteAccountSchema, updateAccountInfosSchema } from "../validation/account.validation"
import { validateRequest } from "../middlewares/validateRequest"

const router = express.Router()

router.post('/add/', validateRequest(createAccountSchema), addAccount)
router.get('/:userid', getAccounts)
router.delete('/:accountid', validateRequest(deleteAccountSchema), deleteAccount)
router.put('/:accountid', validateRequest(updateAccountInfosSchema), updateAccountInfos)
router.post('/category/:accountid', validateRequest(createCategorySchema), addCategory)
export default router