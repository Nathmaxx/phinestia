import express from "express"
import { signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth } from "../controllers/auth.controllers"
import { verifyToken } from "../middlewares/verifyToken"

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get('/logout', logout)
router.get('/check-auth', verifyToken, checkAuth)

export default router