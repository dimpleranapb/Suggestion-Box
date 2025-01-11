import mongoose, { Schema, Document } from "mongoose";

// Updated Message interface and schema to include purpose
export interface Message extends Document {
  content: string;
  createdAt: Date;
  purpose: "feedback" | "suggestion" | "appreciation" | "complaint"; // Add the purpose field
}

const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  purpose: {
    type: String,
    enum: ["feedback", "suggestion", "appreciation", "complaint"], // Enum for possible values
    required: true,
    default: "feedback", // Default value
  },
});

// Updated User interface and schema to handle the updated messages array
export interface User extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  createdAt: Date;
  isAcceptingMessages: boolean;
  messages: Message[]; // This will now store messages with the purpose field
}

const userSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, "please use a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code Expiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessages: {
    type: Boolean,
    default: false,
  },
  messages: [MessageSchema], // Referencing the MessageSchema
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default UserModel;
