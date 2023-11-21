const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const authController = require("./controllers/authController")
const productController = require("./controllers/productController")
const app = express()
const url = `mongodb+srv://tshepomashiloane869:${process.env.MONGO_DB_PASS}@cluster0.lyeqzd4.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url).then(() => {
    console.log("connected to mongoose")
})

//routes and middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/auth', authController)
app.use('/product', productController)
app.listen(3000, () => console.log("server has started"))