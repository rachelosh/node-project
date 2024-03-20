import Joi from "joi";
import mongoose from "mongoose";

const minimalProduct = mongoose.Schema({
    productCode: String,
    productName: { type: String, required: true },
    quantity: { type: Number, required: true }
})

const orderSchema = mongoose.Schema({
    orderDate: { type: Date, default: Date.now() },
    dueDate: Date,
    address: { type: String, required: true },
    userId: { type: String, required: true },
    products: [minimalProduct],
    isSetOff: { type: Boolean, default: false }
})
export const Order = mongoose.model("orders", orderSchema);

export const orderValidator = (_orderToValidate) => {

    let orderJoi = Joi.object({
        orderDate: Joi.date(),
        dueDate: Joi.date(),
        address: Joi.string().required(),
        userId: Joi.string().required(),
        products: Joi.array().items(Joi.object({
            productCode: Joi.string().required(),
            productName: Joi.string().required(),
            quantity: Joi.number().required(),
        })),
        isSetOff: Joi.boolean()
    })
    return orderJoi.validate(_orderToValidate);
}