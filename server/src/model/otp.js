import { Schema, model } from "mongoose";
import sendEmail from "../helper/emailSender.js";
import { otpTemplate } from "../template/otpTemplate.js";


const otpSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5,
    }
});

async function sendVerificationEmail(email, otp,name) {
    const mailResponse = await sendEmail(email, 'Send Email...', otpTemplate(otp,name));
    console.log('MAIL RESPONSE -> ', mailResponse.response);
}

otpSchema.pre("save", async function (next) {
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp,this.name);
    }
    next();
})


export const Otp = model('Otp', otpSchema);
