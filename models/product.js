import Joi from "joi";
import { Double } from "mongodb";
import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    productName: { type: String, required: true },
    description: String,
    productionDate: { type: Date, default: Date.now() },
    imageUrl: String,
    price: { type: Double, required: true }
})

export const Product = mongoose.model("products", productSchema);

export const productValidator = (_productToValidate) => {

    let productJoi = Joi.object({
        productName: Joi.string().min(5).max(20).required(),
        description: Joi.string(),
        productionDate: Joi.date(),
        imageUrl: Joi.string(),
        price: Joi.Double().required()
    })

    return productJoi.validate(_productToValidate);
}