import express from "express"
import {
	signup,
	login,
	logout,
	verifyEmail,
	forgotPassword,
	resetPassword,
	checkAuth,
	resendVerificationEmail,
	deleteUser,
	updatePassword,
	updateFirstName,
	updateEmail,
	verifyNewEmail
} from "../controllers/auth.controllers"
import { verifyToken } from "../middlewares/verifyToken"

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.post('/resend-verification-email', resendVerificationEmail)
router.post('/update-email/:userid', updateEmail)
router.post('/verify-new-email/:userid', verifyNewEmail)
router.delete('/:userid', deleteUser)
router.put('/password/:userid', updatePassword)
router.put('/firstname/:userid', updateFirstName)
router.get('/logout', logout)
router.get('/check-auth', verifyToken, checkAuth)

export default router