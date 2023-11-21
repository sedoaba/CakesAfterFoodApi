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
        console.log("This works");
        const newProduct = await Meal.create({...req.body });
        return res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = productController;