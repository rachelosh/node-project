import Joi from "joi";
import mongoose from "mongoose";
import * as roleType from "./roleType.js"

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    role: { type: String, default: roleType.USER },
    signUpDate: { type: Date, default: Date.now() }
})

export const User = mongoose.model("users", userSchema);

export const userValidator = (_userToValidate) => {

    let userJoi = Joi.object({
        email: Joi.string().email().required(),
        userName: Joi.string().min(5).max(15).required(),
        password: Joi.string().required(),
        role: Joi.string(),
        signUpDate: Joi.date()
    })

    return userJoi.validate(_userToValidate);
}