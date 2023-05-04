const express = require('express')
const Categories = require('../models/Categories')
const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
    try {
        const categories = await Categories.find()
        res.status(200).send(categories)
    } catch (e) {
        res.status(500).json({message: "НА сервере произошла ошибка. Попробуйте позже"})
    }
})


module.exports = router
