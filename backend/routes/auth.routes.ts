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
import rateLimit from "express-rate-limit";

const router = express.Router()

const limiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 15,
});

router.post('/signup', limiter, signup)
router.post('/login', limiter, login)
router.post('/forgot-password', limiter, forgotPassword)
router.post('/reset-password/:token', limiter, resetPassword)

router.post('/verify-email', verifyEmail)
router.post('/resend-verification-email', resendVerificationEmail)
router.post('/update-email/:userid', updateEmail)
router.post('/verify-new-email/:userid', verifyNewEmail)
router.delete('/:userid', deleteUser)
router.put('/password/:userid', updatePassword)
router.put('/firstname/:userid', updateFirstName)
router.get('/logout', logout)
router.get('/check-auth', verifyToken, checkAuth)

export default router