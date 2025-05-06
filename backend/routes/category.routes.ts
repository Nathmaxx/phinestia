import express from "express"
import { addCateogry, deleteCateogry, getCategories, updateCateogry } from "../controllers/category.controllers"

const router = express.Router()

router.post('/add', addCateogry)
router.get('/:userid', getCategories)
router.delete('/:categoryid', deleteCateogry)
router.put('/:categoryid', updateCateogry)

export default router