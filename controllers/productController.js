const productController = require('express').Router();
const Meal = require("../models/Meal")

const { verifyTokenAdmin, verifyToken } = require('../middleware/verifyToken')

productController.get('/', verifyToken, async(req, res) => {
    try {
        const products = await Meal.find(req.query)
        return res.status(200).json(products)
    } catch (error) {
        console.error(error);
    }
})

productController.get('/find/:productid', verifyToken, async(req, res) => {
    try {
        const productid = req.params.productid
        const product = await Meal.findById(productid)
        if (!product) return res.status(500).json({ req: "product not found" })
        return res.status(200).json({ product })
    } catch (error) {
        console.error(error);
    }
})

productController.post('/', verifyTokenAdmin, async(req, res) => {
    try {
        const newProduct = await Product.create({...req.body })
        return res.status(201).json(newProduct)
    } catch (error) {
        console.error(error);
    }
})

module.exports = productController