
import express from "express"

const router = express.Router()

router.post('/add-transaction')
router.get('/:userid')
router.delete('/:userid')
router.put('/:userid')

export default router