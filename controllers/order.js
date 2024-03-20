import mongoose from "mongoose";
import { Order, orderValidator } from "../models/order.js";

export const getAllOrders = async (req, res) => {
    try {
        let orders = await Order.find();
        res.send(orders);
    }
    catch (err) {
        res.status(500).send("cannot find the orders");
    }
}
export const addOrder = async (req, res) => {
    try {
        let newOrder = orderValidator(req.body);
        if (newOrder.error)
            return res.status(400).send("invalid details");
        newOrder = await Order.create(req.body);
        res.json(newOrder);
    }
    catch (err) {
        res.status(500).send("cannot add the order");
    }
}
export const deleteOrderById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("invalid id");
    try {
        let delOrder = await Order.findByIdAndDelete({ _id: id });
        if (!delOrder)
            res.status(400).send("no order with such id");
        res.json(delOrder);
    }
    catch (err) {
        res.status(500).send("cannot delete order");
    }
}
export const getAllOrdersByUserId = async (req, res) => {
    try {
        let { _id } = req.user;
        let orders = await Order.find({ userId: _id });
        if (!orders)
            return res.status(400).send("the user has no orders")
    }
    catch (err) {
        res.status(500).send("cannot get the orders");
    }
}
export const updateSetOffOrder = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("invalid id");
    try {
        let updatedOrder = await Order.findById(id);
        if (!updatedOrder)
            return res.status(400).send("no order with such id");
        updatedOrder = await Order.findByIdAndUpdate({ _id: id }, { isSetOff: true }, { new: true })
        if (!updatedOrder)
            return res.status(400).send("no order with such id");
        res.json(updatedOrder);
    }
    catch (err) {
        res.status(500).send("cannot update order");
    }
}
