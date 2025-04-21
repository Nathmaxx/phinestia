import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	isVerified: {
		type: Boolean,
		default: false
	},
	resetPasswordToken: String,
	resetPasswordExpiresAt: String,
	verificationToken: String,
	verificationTokenExpiresAt: String,
	createdAt: {
		type: Date,
		default: Date.now
	},
	lastLogin: {
		type: Date,
		default: null
	}
})

export const Users = mongoose.model("Users", usersSchema)