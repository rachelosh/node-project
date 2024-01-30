import { Product, productValidator } from "../models/product.js";
import mongoose from "mongoose";

export const getAllProduct = async (req, res) => {
    let { search, page, itemsPerPage = 20 } = req.query;
    try {
        let filter = {};
        if (search)
            filter.name = new RegExp(search, "i")
        let allProducts = await Product.find(filter).skip((page - 1) * itemsPerPage).limit(itemsPerPage).sort({ "name": 1 });
        res.json(allProducts);
    }
    catch (err) {
        res.status(500).send("cannot find the products");
    }
}
export const getProductById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("no valid id");
    try {
        let product = await Product.findOne({ _id: id });
        if (!product)
            return res.status(400).send("no product with such id");
        res.json(product)
    }
    catch (err) {
        res.status(500).send("cannot find the product");
    }
}
export const addProduct = async (req, res) => {
    try {
        let newProduct = productValidator(req.body);
        if (newProduct.error)
            return res.status(400).send("invalid details");
        newProduct = await Product.create(req.body);
        res.json(newProduct);
    }
    catch (err) {
        res.status(500).send("cannot add product");
    }

}
export const deleteProductById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("no valid id");
    try {
        let delProduct = await Product.findByIdAndDelete({ _id: id });
        if (!delProduct)
            return res.status(400).send("no product with such id");
        res.json(delProduct);
    }
    catch (err) {
        res.status(500).send("cannot find the product");
    }
}
export const updateProductById = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("no valid id");
    try {
        let productToUpdate = await Product.findOne({ _id: id });
        if (!productToUpdate)
            return res.status(400).send("no product with such id");
        let validateProduct = productValidator(req.body);
        if (validateProduct.error)
            return res.status(400).send("invalidate parameters");
        let { productName, description, productionDate, imageUrl } = req.body;
        productToUpdate.productName = productName || productToUpdate.productName;
        productToUpdate.description = description || productToUpdate.description;
        productToUpdate.productionDate = productionDate || productToUpdate.productionDate;
        productToUpdate.imageUrl = imageUrl || productToUpdate.imageUrl;
        productToUpdate.save();
        res.json(productToUpdate);

    }
    catch (err) {
        res.status(500).send("cannot find the product to update");
    }
}