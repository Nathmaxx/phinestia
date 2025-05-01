import express from "express"

const router = express.Router()

router.post('/add-account')
router.get('/:userid')
router.delete('/:userid')
router.put('/:userid')

export default router