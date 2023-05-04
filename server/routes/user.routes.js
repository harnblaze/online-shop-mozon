const express = require('express')
const User = require("../models/Products");

const router = express.Router({mergeParams: true})


router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (e) {
        res.status(500).json({message: "НА сервере произошла ошибка. Попробуйте позже"})
    }
})


module.exports = router
