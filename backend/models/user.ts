import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
	resetPasswordExpiresAt: Date,
	verificationToken: String,
	verificationTokenExpiresAt: Date,
	lastLogin: {
		type: Date,
		default: null
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
})

export const User = mongoose.model("User", userSchema);



