const productController = require('express').Router();
const Meal = require("../models/Meal");

// const { verifyTokenAdmin, verifyToken } = require('../middleware/verifyToken')

productController.get('/', async(req, res) => {
    try {
        const products = await Meal.find(req.query);
        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

productController.get('/find/:productid', async(req, res) => {
    try {
        const productid = req.params.productid;
        const product = await Meal.findById(productid);
        if (!product) return res.status(500).json({ error: "Product not found" });
        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

productController.post('/add', async(req, res) => {
    try {
        const newProduct = await Meal.create({...req.body });
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

productController.post('/update/:productid', async(req, res) => {
    try {

        const productid = req.params.productid;
        // If the productid is blank or undefined, return a client error message
        if (!productid || productid.trim() === '') {
            return res.status(400).json({ error: "Please provide a valid product id to update the product!" });
        }

        //find the product before update
        const product = await Meal.findById(productid);

        //if it happens that the product is not in the database just return this message
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        //Return the updated product
        const updateProduct = await Meal.findByIdAndUpdate(productid, { ...req.body }, { new: true });
        return res.status(200).json(updateProduct);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = productController;