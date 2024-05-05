const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema(
    {
        email: {
          type: String,
          required: [true, "Email is required"],
          unique: true,
        },
        password: {
          type: String,
          required: [true, "Password is required"],
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter",
        },
        token: {
          type: String,
          default: null,
        },
        avatarUrl: {
          type: String,
          default: null,
        },        
        verify: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            required: [true, 'Verify token is required'],
        },        
      },
      { versionKey: false, timestamps: true }
    );

    const User = mongoose.model("user", user);

    module.exports = User;