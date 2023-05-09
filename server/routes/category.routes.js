const express = require('express')
const Categories = require('../models/Categories')
const auth = require("../middleware/auth.middleware");
const User = require("../models/User");
const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
    try {
        const categories = await Categories.find()
        res.status(200).send(categories)
    } catch (e) {
        res.status(500).json({message: "НА сервере произошла ошибка. Попробуйте позже"})
    }
})

router.post("/", auth, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id)
        const category = req.body
        delete category._id
        if (currentUser.isAdmin) {
            const newCategory = await Categories.create({
                ...category,
            });
            res.status(201).send(newCategory);
        } else {
            res.status(401).json({message: "Access denied"});
        }
    } catch (e) {
        console.log(e)
        res
            .status(500)
            .json({message: "НА сервере произошла ошибка. Попробуйте позже"});
    }
});


module.exports = router
