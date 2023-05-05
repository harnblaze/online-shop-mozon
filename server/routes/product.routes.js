const express = require("express");
const Product = require("../models/Products");
const auth = require("../middleware/auth.middleware");

const router = express.Router({ mergeParams: true });

router.patch("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;

    if (req.user.isAdmin) {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        req.body,
        { new: true }
      );
      res.status(200).send(updatedProduct);
    } else {
      res.status(401).json({ message: "Access denied" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "НА сервере произошла ошибка. Попробуйте позже" });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const newProduct = await Product.create({
        ...req.body,
      });
      res.status(201).send(newProduct);
    } else {
      res.status(401).json({ message: "Access denied" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "НА сервере произошла ошибка. Попробуйте позже" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (e) {
    res
      .status(500)
      .json({ message: "НА сервере произошла ошибка. Попробуйте позже" });
  }
});

router.delete("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;

    if (req.user.isAdmin) {
      const removedProduct = await Product.findByIdAndDelete(productId);
      res.status(201).send(removedProduct);
    } else {
      res.status(401).json({ message: "Access denied" });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "НА сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
