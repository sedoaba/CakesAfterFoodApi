const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 4,
    },
    description: {
        type: String,
        required: true,
        min: 4,
    },
    price: {
        type: Number,
        required: true,
        min: 6
    },
    img: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,

    }
})

module.exports = mongoose.model('Meal', MealSchema)