const authController = require("express").Router({})
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// register

authController.post("/register", async(req, res) => {
    try {
        const exists = await User.findOne({ email: req.body.email })
        if (exists) {
            throw new Error("User already registered")
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({...req.body, password: hashedPassword })
        const { password, ...other } = newUser._doc
        const token = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })
        console.log("user saved")
        return res.status(201).json({ other, token })
    } catch (error) {
        return res.status(500).json(error.message)

    }
})

authController.post("/login", async(req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error("User does not exist")

        }
        const comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            throw new Error("User does not exist")
        }
        const { password, ...other } = user._doc
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })

        return res.status(200).json({ other, token })
    } catch (error) {
        return res.status(500).json(error.message)
    }
})

module.exports = authController