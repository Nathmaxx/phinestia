import express from "express"
import { addAccount, addCategory, deleteAccount, deleteCategory, getAccounts, updateAccountInfos, updateCategoryName } from "../controllers/account.controllers"
import { createAccountSchema, createCategorySchema, updateAccountInfosSchema, updateCategoryNameSchema } from "../validation/account.validation"
import { validateRequest } from "../middlewares/validateRequest"

const router = express.Router()

router.get('/:userid', getAccounts)
router.post('/', validateRequest(createAccountSchema), addAccount)
router.put('/:accountid', validateRequest(updateAccountInfosSchema), updateAccountInfos)
router.delete('/:accountid', deleteAccount)


router.post('/:accountid/category', validateRequest(createCategorySchema), addCategory)
router.put('/:accountid/category/:categoryid', validateRequest(updateCategoryNameSchema), updateCategoryName)
router.delete('/:accountid/category/:categoryid', deleteCategory)
export default router