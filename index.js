const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const app = express()
const url = `mongodb+srv://tshepomashiloane869:${process.env.MONGO_DB_PASS}@cluster0.lyeqzd4.mongodb.net/?retryWrites=true&w=majority`


mongoose.connect(url).then(() => {
    console.log("connected to mongoose")
})

app.listen(3000, () => console.log("server has started"))