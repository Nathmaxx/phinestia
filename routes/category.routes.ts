import express from "express"

const router = express.Router()

router.post('/add-category')
router.get('/:userid')
router.delete('/:userid')
router.put('/:userid')

export default router