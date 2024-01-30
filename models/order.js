import Joi from "joi";
import { boolean } from "joi";
import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    orderDate: { type: Date, default: Date.now() },
    dueDate: Date,
    address: { type: String, required: true },
    userId: { type: String, required: true },
    //minimal producte!!
    isSetOff: boolean
})

export const order = mongoose.model("orders", orderSchema);

export const orderValidator = (_orderToValidate) => {

    let orderJoi = Joi.object({
        orderDate: Joi.date(),
        dueDate: Joi.date(),
        address: Joi.string().required(),
        userId: Joi.string().required(),
        //minimal products
        isSetOff: Joi.boolean()
    })

    return orderJoi.validate(_orderToValidate);
}