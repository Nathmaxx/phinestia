import mongoose, { Schema } from "mongoose";

enum FieldType {
	EMAIL = "email",
	FIRSTNAME = "firstname",
	PASSWORD = "password"
}

const userInfosHistorySchema = new mongoose.Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	field: {
		type: String,
		enum: Object.values(FieldType),
		required: true
	},
	ancientValue: {
		type: Schema.Types.Mixed,
		required: true
	},
	newValue: {
		type: Schema.Types.Mixed,
		required: true
	}, date: {
		type: Date,
		default: Date.now()
	}
})

userInfosHistorySchema.index({ userId: 1, date: -1 });
userInfosHistorySchema.index({ field: 1, userId: 1 });

export const UserInfosHistory = mongoose.model("UserInfosHistory", userInfosHistorySchema);
