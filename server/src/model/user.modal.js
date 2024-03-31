import { Schema, model } from "mongoose";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from "dotenv";
import crypto from 'crypto';
config();

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: {
        url: {
            type: String,
            default: "",
        },
        publicId: {
            type: String,
            default: "",
        }
    },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
    bio: {
        type: String,
        default: "",
    },
    access_token: {
        type: String,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
}, {
    timestamps: true
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcryptjs.hash(this.password, 10);
});

userSchema.methods = {
    comparePassword: async function (planeText) {
        return await bcryptjs.compare(planeText, this.password);
    },
    generateAccessToken: function () {
        return jwt.sign({
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.name,
        }, process.env.ACESS_TOKEN_SECRET, {
            expiresIn: process.env.ACESS_TOKEN_EXPIRY
        });
    },
    generatePasswordResetToken: async function () {
        const resetToken = crypto.randomBytes(20).toString('hex');
        this.forgotPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000;
        return resetToken;
    }
}

export const User = model('User', userSchema);
