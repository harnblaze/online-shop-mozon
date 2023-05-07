const express = require("express");
const Product = require("../models/Products");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

const router = express.Router({mergeParams: true});

router.put("/:productId", auth, async (req, res) => {
    try {
        const {productId} = req.params;
        const currentUser = await User.findById(req.user._id)

        if (currentUser.isAdmin) {
            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                req.body,
                {new: true}
            );
            res.status(200).send(updatedProduct);
        } else {
            res.status(401).json({message: "Access denied"});
        }
    } catch (e) {
        res
            .status(500)
            .json({message: "НА сервере произошла ошибка. Попробуйте позже"});
    }
});

router.put("/", auth, async (req, res) => {
    try {
        const currentUser = await User.findById(req.user._id)
        const product = req.body
        delete product._id
        if (currentUser.isAdmin) {
            const newProduct = await Product.create({
                ...product,
            });
            res.status(201).send(newProduct);
        } else {
            res.status(401).json({message: "Access denied"});
        }
    } catch (e) {
        res
            .status(500)
            .json({message: "НА сервере произошла ошибка. Попробуйте позже"});
    }
});

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).send(products);
    } catch (e) {
        res
            .status(500)
            .json({message: "НА сервере произошла ошибка. Попробуйте позже"});
    }
});

router.delete("/:productId", auth, async (req, res) => {
    try {
        const {productId} = req.params;
        const currentUser = await User.findById(req.user._id)

        if (currentUser.isAdmin) {
            const removedProduct = await Product.findByIdAndDelete(productId);
            res.status(201).send(removedProduct);
        } else {
            res.status(401).json({message: "Access denied"});
        }
    } catch (e) {
        res
            .status(500)
            .json({message: "НА сервере произошла ошибка. Попробуйте позже"});
    }
});

module.exports = router;
