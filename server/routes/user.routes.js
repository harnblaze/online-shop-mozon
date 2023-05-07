const express = require('express')
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

const router = express.Router({mergeParams: true})


router.get("/:userId", auth, async (req, res) => {
    try {
        const {userId} = req.params;
        if (userId === req.user._id) {
            const currentUser = await User.findById(userId)

            res.status(200).send(currentUser);
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
