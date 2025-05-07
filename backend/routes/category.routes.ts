import express from "express"
import { addCateogry, deleteCateogry, getCategories, updateCategory } from "../controllers/category.controllers"

const router = express.Router()

router.post('/add', addCateogry)
router.get('/:userid', getCategories)
router.delete('/:categoryid', deleteCateogry)
router.put('/:categoryid', updateCategory)

export default router