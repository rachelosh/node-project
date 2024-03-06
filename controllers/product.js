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
// export const getAllwines = async (req, res) => {
//     const { page , perPage , search } = req.query;
//     try {
//         let allProducts;
//         const filter = {};
//         if (search) {
//             filter.name = search;
//         }

//          allProducts = await Wine.find(filter)
//             .skip((page-1)*perPage)
//             .limit(perPage);


//         res.json(allProducts);
//     } catch (err) {
//         res.status(500).send("Unable to retrieve the products");
//     }
// }

export const getNumOfPages = async (req, res) => {
    try {
        let allProductsCount = await Wine.countDocuments();
        let perPage = parseInt(req.query.perPage) || 6;
        console.log("Total number of products: ", allProductsCount);
        console.log("Products per page: ", perPage);

        let numPages = Math.ceil(allProductsCount / perPage);
        console.log("Number of pages: ", numPages);

        return res.json({ numPages });
    } catch (err) {
        console.error("An error occurred: ", err);
        return res.status(400).send("An error occurred: " + err);
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
            return res.status(400).send("invalid details" + newProduct);
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
        let { productName, description, productionDate, imageUrl, price } = req.body;
        productToUpdate.productName = productName || productToUpdate.productName;
        productToUpdate.description = description || productToUpdate.description;
        productToUpdate.productionDate = productionDate || productToUpdate.productionDate;
        productToUpdate.imageUrl = imageUrl || productToUpdate.imageUrl;
        productToUpdate.price = price || productToUpdate.price;
        productToUpdate.save();
        res.json(productToUpdate);

    }
    catch (err) {
        res.status(500).send("cannot find the product to update");
    }
}