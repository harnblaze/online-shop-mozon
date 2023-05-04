const express = require('express')
const Product = require("../models/Products");

const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).send(products)
    } catch (e) {
        res.status(500).json({message: "НА сервере произошла ошибка. Попробуйте позже"})
    }
})


module.exports = router
