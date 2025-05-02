import express from "express"
import { addCateogry, deleteCateogry, getCategories, updateCateogry } from "../controllers/category.controllers"

const router = express.Router()

router.post('/add', addCateogry)
router.get('/:userid', getCategories)
router.delete('/:userid', deleteCateogry)
router.put('/:userid', updateCateogry)

export default router