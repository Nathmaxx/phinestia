import mongoose, { Schema } from "mongoose";

enum FieldType {
	EMAIL = "email",
	FIRSTNAME = "firstname",
	PASSWORD = "password"
}

const changeEmailRequest = new mongoose.Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	varificationToken: {
		type: String,
		required: true
	},
	verificationTokenExpiresAt: {
		type: Date,
		required: true
	}
})

export const ChangeEmailRequest = mongoose.model("ChangeEmailRequest", changeEmailRequest);
